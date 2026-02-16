import { type Request,type Response, type NextFunction } from 'express';
import { z, ZodError } from 'zod';


export function validateUserData(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body against the schema
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.issues });
      }
      next(error); // Pass other errors to the general error handler
    }
  };
}
