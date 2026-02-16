import {type Request, type Response} from 'express'
import User from '../models/user.model.ts';
import bcrypt from 'bcryptjs';

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

 