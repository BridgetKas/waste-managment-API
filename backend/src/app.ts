
import express, {  type Application,type Request, type Response } from 'express';
import userRouter  from './routes/user.route.ts';
import cors from 'cors';

export const app: Application = express();

app.use(cors());
app.use(express.json())

app.use(userRouter)










