
import dotenv from 'dotenv'
import { type Request, type Response,type NextFunction } from 'express';
import jwt   from 'jsonwebtoken';
import pkg from 'jsonwebtoken'

const { JsonWebTokenError, TokenExpiredError } = pkg;

dotenv.config({quiet:true})

const secretKey = process.env.JWT_SECRET

if (!secretKey) {
  throw new Error('FATAL ERROR: JWT_SECRET is not defined.');
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token as string, secretKey as string) ;
    req.user = decoded; 
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Authentication failed' });
  }
};


