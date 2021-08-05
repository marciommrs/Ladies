import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token de JWT

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT não encontrado.', 401);
  }

  const [, token] = authHeader.split(' '); // vírgula indica que a primeira posição não será usada.

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Token JWT inválido.', 401);
  }
}
