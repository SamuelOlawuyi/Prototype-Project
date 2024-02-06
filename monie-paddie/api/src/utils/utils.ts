import { Response } from "express";
import Jwt from "jsonwebtoken";
import { IUser } from "../models/user";


export function generateToken(user: IUser, res: Response) {
  const secretKey = process.env.JWT_SECRET as string;
  const expiresIn = 3 * 60 * 60;
  const token = Jwt.sign({ id: user._id }, secretKey, {
    expiresIn,
  });

  // save token as a cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: expiresIn * 1000, // in milliseconds
  });
  res.header("token", token);
  return token;
}


declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}