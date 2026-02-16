import { Request } from 'express'; // This import might be needed depending on your setup

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

export {}; 
