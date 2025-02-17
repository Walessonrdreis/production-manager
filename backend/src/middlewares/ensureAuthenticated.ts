import { Request, Response, NextFunction } from 'express';
import * as jose from 'jose';
import { AppError } from '../errors/AppError';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default'
);

interface JWTPayload extends jose.JWTPayload {
  userId: string;
  role: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não fornecido', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { payload } = await jose.jwtVerify(token, secret);
    
    if (!payload.userId || !payload.role) {
      throw new AppError('Token inválido', 401);
    }

    request.user = {
      id: payload.userId as string,
      role: payload.role as string,
    };

    return next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
} 