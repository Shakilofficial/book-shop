import { z } from 'zod';

//Define the product validation schema
const productValidationSchema = z.object({
  //Define the title field validation (required, min length, max length, and trimming)
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),
  //Define the author field validation (required, min length, max length, and trimming)
  author: z
    .string()
    .min(1, 'Author is required')
    .max(50, 'Author name must not exceed 50 characters')
    .trim(),
  //Define the price field validation (required, min value, max value, and type)
  price: z
    .number()
    .min(0, 'Price must be a positive number')
    .max(10000, 'Price must not exceed 10,000'),
  //Define the category field validation (required, and one of the predefined values)
  category: z.enum([
    'Fiction',
    'Science',
    'SelfDevelopment',
    'Poetry',
    'Religious',
  ]),
  //Define the description field validation (required, min length, max length, and trimming)
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(500, 'Description must not exceed 500 characters')
    .trim(),
  //Define the quantity field validation (required, min value, max value, and type)
  quantity: z
    .number()
    .min(0, 'Quantity must be a non-negative number')
    .max(1000, 'Quantity must not exceed 1,000'),
  //Define the inStock field validation (required and type)
  inStock: z.boolean(),
});

export default productValidationSchema;
