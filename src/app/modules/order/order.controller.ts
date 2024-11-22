import { Request, Response } from 'express';
import { orderService } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const parsedData = orderValidationSchema.parse(req.body);
    const result = await orderService.createOrder(parsedData);
    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: error.errors,
      });
    }
    res.status(400).json({
      message: error.message || 'Something went wrong',
      success: false,
      error,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
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
