import { z } from 'zod';

//Define the order validation schema
const orderValidationSchema = z.object({
  //Define the email field validation
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  //Define the product field validation
  product: z.string().min(1, 'Product ID is required'),
  //Define the quantity field validation
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1'),
  //Define the totalPrice field validation
  totalPrice: z.number().min(0, 'Total price must be a positive number'),
});

export default orderValidationSchema;
