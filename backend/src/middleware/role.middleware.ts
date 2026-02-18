import { type Request, type Response, type NextFunction } from 'express';


export const roleMiddleware = (requiredRole: 'buyer' | 'seller' | 'admin') => 
  (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user profile found' });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: `Forbidden: Requires ${requiredRole} role` });
    }

    next();
};