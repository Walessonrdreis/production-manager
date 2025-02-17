import { Request, Response } from 'express';
import { z } from 'zod';
import { hash, compare } from 'bcryptjs';
import * as jose from 'jose';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'MANAGER', 'USER']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default'
);

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, role } = createUserSchema.parse(request.body);

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new AppError('Usuário já existe');
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return response.status(201).json(user);
  }

  async login(request: Request, response: Response) {
    const { email, password } = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const token = await new jose.SignJWT({
      userId: user.id,
      role: user.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(process.env.JWT_EXPIRES_IN || '1d')
      .sign(secret);

    return response.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  }

  async list(request: Request, response: Response) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return response.json(users);
  }
} 