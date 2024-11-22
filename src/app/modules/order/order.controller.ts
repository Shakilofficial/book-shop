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

export const orderController = {
  createOrder,
};
