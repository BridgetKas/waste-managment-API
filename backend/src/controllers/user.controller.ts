import {type Request, type Response} from 'express'
import User from '../models/user.model.ts';
import bcrypt from 'bcryptjs';
import jwt ,{ type JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({quiet:true})

const secretKey = process.env.JWT_SECRET || 'your_secret_key'

export const registerUsers = async (req:Request, res:Response) => {
    const {firstName,lastName,email,password,registrationNumber,role} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email,registrationNumber,role, password: hashedPassword});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err:unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error registering user', error: err.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
      }
}


export interface UserPayload extends JwtPayload {
  firstName: string;
  email: string;
  role?: 'buyer' | 'seller'; 
}
 
export const authenticateUser = async (req:Request, res:Response) => {
    const {email,password} = req.body;

    try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload: UserPayload = { firstName: user.firstName, email: user.email };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Logged in successfully' });
    } catch (err:unknown) {
        if (err instanceof Error) {
                res.status(500).json({ message: 'Error registering user', error: err.message });
            } else {
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
    }

}