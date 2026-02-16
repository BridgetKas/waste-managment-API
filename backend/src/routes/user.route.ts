

import express, { Router,type Request, type Response } from 'express';
import { z } from 'zod';
import { validateUserData } from '../middleware/user.middleware.ts';

const userRouter: Router = express.Router();

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:z.string().min(1,'Last name is required'),
  email:z.email(),
  password:z.string(),
  registrationNumber:z.number().int().positive('Registration Number must be positive'),
  role:z.string()
});

type User = z.infer<typeof userSchema>;

userRouter.post('/register', validateUserData(userSchema),(req: Request, res: Response) => {
  const { firstName,lastName,email } = req.body;
  console.log(firstName,lastName,email)
  res.json({ message: `User ${firstName} created` });
});

export default userRouter; 
