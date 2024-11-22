import { z } from 'zod';

const productValidationSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(50, 'Author name must not exceed 50 characters')
    .trim(),
  price: z
    .number()
    .min(0, 'Price must be a positive number')
    .max(10000, 'Price must not exceed 10,000'),
  category: z.enum([
    'Fiction',
    'Science',
    'SelfDevelopment',
    'Poetry',
    'Religious',
  ]),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(500, 'Description must not exceed 500 characters')
    .trim(),
  quantity: z
    .number()
    .min(0, 'Quantity must be a non-negative number')
    .max(1000, 'Quantity must not exceed 1,000'),
  inStock: z.boolean(),
});

export default productValidationSchema;
