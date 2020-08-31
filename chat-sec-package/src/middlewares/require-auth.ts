import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '@panthera-errors/custom-errors';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
