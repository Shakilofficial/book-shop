import { Request, Response } from 'express';
import { productService } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const parsedData = productValidationSchema.parse(req.body);
    const result = await productService.createProduct(parsedData);
    res.status(201).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await productService.getAllProducts(searchTerm as string);
    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve books',
      success: false,
      error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getSingleProduct(productId as string);
    res.status(200).json({
      message: 'Book retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve book',
      success: false,
      error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const parsedData = productValidationSchema.partial().parse(req.body);
    const result = await productService.updateProduct(
      productId as string,
      parsedData,
    );
    res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update book',
      success: false,
      error,
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
