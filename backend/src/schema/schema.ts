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


export const wasteSchema = z.object({
  body: z.object({
    title: z.string().trim().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be detailed (min 20 chars)'),
    category: z.enum(['Plastic', 'Metal', 'Paper', 'Electronic', 'Other']),
    quality: z.enum(['Sorted/Clean', 'Unsorted/Mixed', 'Industrial Grade']),
    qualityNotes: z.string().optional(),
    quantity: z.number().positive('Quantity must be greater than 0'),
    location: z.object({
      type: z.literal('Point').default('Point'),
      coordinates: z.tuple([
        z.number().min(-180).max(180), 
        z.number().min(-90).max(90)    
      ]),
      address: z.string().optional(),
    }),
    images: z.array(z.url()).max(5, 'Maximum 5 images allowed'),
    listingType: z.enum(['fixed', 'bidding']),
    price: z.number().positive().optional(),
    unit: z.enum(['kg', 'tonnes', 'pieces']).optional(),
  }).superRefine((data, ctx) => {
    if (data.listingType === 'fixed') {
      if (!data.price) {
        ctx.addIssue({
          code: "custom",
          message: "Price is required for fixed listings",
          path: ['price'],
        });
      }
      if (!data.unit) {
        ctx.addIssue({
          code: "custom",
          message: "Unit is required for fixed listings",
          path: ['unit'],
        });
      }
    }
  }),
});