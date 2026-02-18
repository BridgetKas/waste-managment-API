import {type Request, type Response , type NextFunction} from 'express'
import * as AuthService from '../services/auth.service.ts';
import * as UserService from '../services/user.services.ts';


export const registerUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });

  } catch (err: any) {
    const statusCode = err.statusCode || 500;
    
    return res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
  }
};


export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await AuthService.login(email, password);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user
    });
  } catch (err: any) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
  }
};
 
