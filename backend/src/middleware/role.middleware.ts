import { type Request, type Response, type NextFunction } from 'express';



const roleMiddleware = (requiredRole:string) => (req:Request, res:Response, next:NextFunction) => {
  if (req.user.role !== requiredRole) return res.status(403).json({ message: 'Access forbidden' });
  next();
};