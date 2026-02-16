import express, { Router } from 'express';
import { z } from 'zod';
import { validateUserData, validateUser} from '../middleware/user.middleware.ts';
import { registerUsers, authenticateUser} from '../controllers/user.controller.ts';
import { type Request, type Response,type NextFunction } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.ts';
import { roleMiddleware } from '../middleware/role.middleware.ts';


const userRouter: Router = express.Router();

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:z.string().min(1,'Last name is required'),
  email:z.email(),
  password:z.string(),
  registrationNumber:z.number().int().positive('Registration Number must be positive'),
  role:z.string()
});

const loginSchema = z.object({
  email:z.email(),
  password:z.string()

}
)


userRouter.post('/register', validateUserData(userSchema),registerUsers);
userRouter.post('/login',validateUser(loginSchema),authenticateUser);
userRouter.get('/buyer', authMiddleware, (req:Request, res:Response) => {
  res.status(200).json({ message: 'Welcome to the buyer dashboard', user: req.user });
});

userRouter.get('/seller', [authMiddleware, roleMiddleware('seller')], (req:Request, res:Response) => {
  res.status(200).json({ message: 'Welcome to the seller dashboard', user: req.user });
});


export default userRouter; 
