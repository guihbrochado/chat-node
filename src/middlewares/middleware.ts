import { Request, Response, NextFunction } from "express";
import  jwt, { decode }  from "jsonwebtoken";
import { config } from "../config/env";

export interface AuthenticatedRequest extends Request {
    user?: { id: string, username: string };
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret) as { id: string, username:string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }
}
