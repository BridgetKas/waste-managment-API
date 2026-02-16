
import express, {  type Application,type Request, type Response } from 'express';
import userRouter  from './routes/user.route.ts';
import dotenv from 'dotenv';

// For environment variables
dotenv.config();

export const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())



app.use(userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});









