import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.ts';

export const login = async (email: string, pass: string) => {
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    const error = new Error('Invalid credentials');
    (error as any).statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(pass, user.password!);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    (error as any).statusCode = 401;
    throw error;
  }

  const payload = { id: user._id.toString(), role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });

  return { token, user: { id: user._id, role: user.role } };
};