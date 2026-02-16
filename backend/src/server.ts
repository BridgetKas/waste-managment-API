import {app} from './app.ts'
import { connectDB } from '../db.ts'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;


const startServer = async () => {
  await connectDB(); 
  
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

};

startServer();