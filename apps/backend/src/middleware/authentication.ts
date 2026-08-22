import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token not found',
    });
  }

  jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET as string,
    async (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized access',
        });
      }
      req.user = decoded;
      return next();
    },
  );

  return null;
};
