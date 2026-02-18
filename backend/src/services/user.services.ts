import bcrypt from 'bcrypt';
import { User } from '../models/user.model.ts';
import { type IUser } from '../interfaces/user.interface.ts'; 
import dotenv from 'dotenv';

dotenv.config({quiet:true})

export const createUser = async (userData: Partial<IUser>) => {
  if (!userData.email) {
    const error = new Error('Email is required for registration');
    (error as any).statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    const error = new Error('User with this email already exists');
    (error as any).statusCode = 409; 
    throw error;
  }

  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  const hashedPassword = await bcrypt.hash(userData.password!, saltRounds);

  const user = new User({
    ...userData,
    password: hashedPassword
  });

  return await user.save();
};