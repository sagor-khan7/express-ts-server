import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token as string, config.jwtSecret as string);
      req.user = decoded as JwtPayload;
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        details: error,
      });
    }
  };
};

export default auth;
