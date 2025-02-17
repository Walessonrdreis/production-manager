import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';

const materialSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  sku: z.string().min(3),
  stock: z.number().int().min(0),
  minStock: z.number().int().min(0),
  unit: z.string(),
});

export class MaterialController {
  async create(request: Request, response: Response) {
    const data = materialSchema.parse(request.body);

    const materialExists = await prisma.material.findUnique({
      where: { sku: data.sku },
    });

    if (materialExists) {
      throw new AppError('Material com este SKU já existe');
    }

    const material = await prisma.material.create({
      data,
    });

    return response.status(201).json(material);
  }

  async list(request: Request, response: Response) {
    const materials = await prisma.material.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return response.json(materials);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const material = await prisma.material.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!material) {
      throw new AppError('Material não encontrado', 404);
    }

    return response.json(material);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = materialSchema.partial().parse(request.body);

    const material = await prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      throw new AppError('Material não encontrado', 404);
    }

    if (data.sku && data.sku !== material.sku) {
      const skuExists = await prisma.material.findUnique({
        where: { sku: data.sku },
      });

      if (skuExists) {
        throw new AppError('Material com este SKU já existe');
      }
    }

    const updatedMaterial = await prisma.material.update({
      where: { id },
      data,
    });

    return response.json(updatedMaterial);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const material = await prisma.material.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!material) {
      throw new AppError('Material não encontrado', 404);
    }

    if (material.products.length > 0) {
      throw new AppError('Não é possível excluir um material que está sendo usado em produtos');
    }

    await prisma.material.delete({
      where: { id },
    });

    return response.status(204).send();
  }
} 