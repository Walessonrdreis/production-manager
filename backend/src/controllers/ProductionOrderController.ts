import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';

const productionOrderSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
});

export class ProductionOrderController {
  async create(request: Request, response: Response) {
    const data = productionOrderSchema.parse(request.body);

    const product = await prisma.product.findUnique({
      where: { id: data.productId },
      include: {
        materials: {
          include: {
            material: true,
          },
        },
      },
    });

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    // Verificar se há material suficiente em estoque
    for (const productMaterial of product.materials) {
      const material = productMaterial.material;
      const requiredQuantity = productMaterial.quantity * data.quantity;

      if (material.stock < requiredQuantity) {
        throw new AppError(
          `Material ${material.name} não tem estoque suficiente. Necessário: ${requiredQuantity} ${material.unit}, Disponível: ${material.stock} ${material.unit}`
        );
      }
    }

    const productionOrder = await prisma.productionOrder.create({
      data,
      include: {
        product: true,
      },
    });

    return response.status(201).json(productionOrder);
  }

  async list(request: Request, response: Response) {
    const productionOrders = await prisma.productionOrder.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response.json(productionOrders);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const productionOrder = await prisma.productionOrder.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            materials: {
              include: {
                material: true,
              },
            },
          },
        },
      },
    });

    if (!productionOrder) {
      throw new AppError('Ordem de produção não encontrada', 404);
    }

    return response.json(productionOrder);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = productionOrderSchema.partial().parse(request.body);

    const productionOrder = await prisma.productionOrder.findUnique({
      where: { id },
    });

    if (!productionOrder) {
      throw new AppError('Ordem de produção não encontrada', 404);
    }

    if (productionOrder.status !== 'PENDING') {
      throw new AppError('Só é possível alterar ordens de produção pendentes');
    }

    const updatedProductionOrder = await prisma.productionOrder.update({
      where: { id },
      data,
      include: {
        product: true,
      },
    });

    return response.json(updatedProductionOrder);
  }

  async updateStatus(request: Request, response: Response) {
    const { id } = request.params;
    const { status } = updateStatusSchema.parse(request.body);

    const productionOrder = await prisma.productionOrder.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            materials: {
              include: {
                material: true,
              },
            },
          },
        },
      },
    });

    if (!productionOrder) {
      throw new AppError('Ordem de produção não encontrada', 404);
    }

    if (status === 'IN_PROGRESS' && productionOrder.status === 'PENDING') {
      // Verificar e consumir materiais do estoque
      for (const productMaterial of productionOrder.product.materials) {
        const material = productMaterial.material;
        const requiredQuantity = productMaterial.quantity * productionOrder.quantity;

        if (material.stock < requiredQuantity) {
          throw new AppError(
            `Material ${material.name} não tem estoque suficiente. Necessário: ${requiredQuantity} ${material.unit}, Disponível: ${material.stock} ${material.unit}`
          );
        }

        await prisma.material.update({
          where: { id: material.id },
          data: {
            stock: material.stock - requiredQuantity,
          },
        });
      }
    } else if (status === 'COMPLETED' && productionOrder.status === 'IN_PROGRESS') {
      // Adicionar produtos ao estoque
      await prisma.product.update({
        where: { id: productionOrder.productId },
        data: {
          stock: {
            increment: productionOrder.quantity,
          },
        },
      });
    }

    const updatedProductionOrder = await prisma.productionOrder.update({
      where: { id },
      data: {
        status,
        startDate: status === 'IN_PROGRESS' ? new Date() : productionOrder.startDate,
        endDate: status === 'COMPLETED' ? new Date() : productionOrder.endDate,
      },
      include: {
        product: true,
      },
    });

    return response.json(updatedProductionOrder);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const productionOrder = await prisma.productionOrder.findUnique({
      where: { id },
    });

    if (!productionOrder) {
      throw new AppError('Ordem de produção não encontrada', 404);
    }

    if (productionOrder.status !== 'PENDING') {
      throw new AppError('Só é possível excluir ordens de produção pendentes');
    }

    await prisma.productionOrder.delete({
      where: { id },
    });

    return response.status(204).send();
  }
} 