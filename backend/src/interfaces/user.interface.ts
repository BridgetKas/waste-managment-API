import { Document } from 'mongoose';
import { type JwtPayload} from 'jsonwebtoken'


export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; 
  registrationNumber: string;
  role: 'buyer' | 'seller';
  
}


export interface UserPayload extends JwtPayload {
  role: 'buyer' | 'seller'; 
  id:string;
}