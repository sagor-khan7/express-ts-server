import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    const decoded = jwt.verify(token as string, config.jwtSecret as string);
    console.log({ decoded });
    next();
  };
};

export default auth;
