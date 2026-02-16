
import dotenv from 'dotenv'
import { type Request, type Response,type NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

dotenv.config({quiet:true})

const secretKey = process.env.JWT_SECRET || 'your_secret_key'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET; 

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


