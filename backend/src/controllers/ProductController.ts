import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  sku: z.string().min(3),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  minStock: z.number().int().min(0),
});

export class ProductController {
  async create(request: Request, response: Response) {
    const data = productSchema.parse(request.body);

    const productExists = await prisma.product.findUnique({
      where: { sku: data.sku },
    });

    if (productExists) {
      throw new AppError('Produto com este SKU já existe');
    }

    const product = await prisma.product.create({
      data,
    });

    return response.status(201).json(product);
  }

  async list(request: Request, response: Response) {
    const products = await prisma.product.findMany({
      include: {
        _count: {
          select: {
            productionOrders: true,
            materials: true,
          },
        },
      },
    });

    return response.json(products);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        materials: {
          include: {
            material: true,
          },
        },
        productionOrders: true,
      },
    });

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    return response.json(product);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = productSchema.partial().parse(request.body);

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    if (data.sku && data.sku !== product.sku) {
      const skuExists = await prisma.product.findUnique({
        where: { sku: data.sku },
      });

      if (skuExists) {
        throw new AppError('Produto com este SKU já existe');
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });

    return response.json(updatedProduct);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        productionOrders: true,
        materials: true,
      },
    });

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    if (product.productionOrders.length > 0) {
      throw new AppError('Não é possível excluir um produto com ordens de produção');
    }

    await prisma.$transaction([
      prisma.productMaterial.deleteMany({
        where: { productId: id },
      }),
      prisma.product.delete({
        where: { id },
      }),
    ]);

    return response.status(204).send();
  }
} 