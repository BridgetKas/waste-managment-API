import { z } from 'zod';

export const registrationSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(2, 'First name is required'),
    lastName: z.string().trim().min(2, 'Last name is required'),
    email: z.email('Invalid email format').lowercase(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    registrationNumber: z.number({ error: 'Reg number is required' }),
    role: z.enum(['buyer', 'seller']).default('buyer'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email('Invalid email').lowercase(),
    password: z.string().min(1, 'Password is required'),
  }),
});