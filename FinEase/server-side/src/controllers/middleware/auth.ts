import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

  if (!token) {
    res.status(401);
    return res.json({
      success: false,
      message: 'Please login',
      error: 'No token provided'
    });
  }

  const secretKey = process.env.JWT_SECRET as string;
  try {
    const decodedPayload = jwt.verify(token, secretKey);
    req.user = decodedPayload as IPayload;
    next();

  } catch (error: any) {
    console.error(error);
    res.status(401);
    return res.json({
      success: false,
      message: 'Unauthorized',
      error: error.message
    });
  }
}

export function adminPass(req: Request, res: Response, next: NextFunction) {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    res.status(403);
    return res.json({
      success: false,
      message: 'Forbidden',
      error: 'You are not authorized to perform this action'
    });
  }

  next();

}


declare module 'express-serve-static-core' {
  interface Request {
    user: IPayload;
  }
}

interface IPayload {
  id: string;
  isAdmin: boolean;
  username: string;
}