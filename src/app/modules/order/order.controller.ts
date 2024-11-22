import { Request, Response } from 'express';
import { orderService } from './order.service';
import orderValidationSchema from './order.validation';

//Controller function to create an order
const createOrder = async (req: Request, res: Response) => {
  try {
    //Validate the incoming request data using the Zod schema Validation
    const parsedData = orderValidationSchema.parse(req.body);

    //Create a new order using the validated data
    const result = await orderService.createOrder(parsedData);
    //Send a response with the created order
    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    //Handle Zod validation errors specifically
    if (error.name === 'ZodError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: error.errors,
      });
    }
    //Handle other errors
    res.status(400).json({
      message: error.message || 'Something went wrong',
      success: false,
      error,
    });
  }
};

//Controller function to calculate the revenue of all orders
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    //Calculate the revenue using the order service
    const totalRevenue = await orderService.calculateRevenue();

    //Send a response with the calculated revenue data
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    //Handle errors during revenue calculation
    res.status(400).json({
      message: error.message || 'Failed to calculate revenue',
      success: false,
      error,
    });
  }
};

export const orderController = {
  createOrder,
  calculateRevenue,
};
