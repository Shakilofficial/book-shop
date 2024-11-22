import { Request, Response } from 'express';
import { productService } from './product.service';
import productValidationSchema from './product.validation';

//Controller function to create a product
const createProduct = async (req: Request, res: Response) => {
  try {
    //Validate the incoming request data using the Zod schema Validation
    const parsedData = productValidationSchema.parse(req.body);
    //Create a new product using the validated data
    const result = await productService.createProduct(parsedData);
    //Send a response with the created product
    res.status(201).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    //Handle error during product creation
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error,
    });
  }
};

//Controller function to get all products, optionally filtered by a search term
const getAllProducts = async (req: Request, res: Response) => {
  try {
    //Extract the search term from the request query parameters
    const { searchTerm } = req.query;
    //Fetch all products, optionally filtered by the search term
    const result = await productService.getAllProducts(searchTerm as string);
    //Send a response with the retrieved products
    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    //Handle errors during product retrieval
    res.status(400).json({
      message: 'Failed to retrieve books',
      success: false,
      error,
    });
  }
};

//Controller function to get a single product by its ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    //Extract the product ID from the request parameters
    const { productId } = req.params;
    //Fetch a single product by its ID
    const result = await productService.getSingleProduct(productId as string);
    //Send a response with the retrieved product
    res.status(200).json({
      message: 'Book retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    //Handle errors during product retrieval
    res.status(400).json({
      message: 'Failed to retrieve book',
      success: false,
      error,
    });
  }
};

//Controller function to update a product by its ID
const updateProduct = async (req: Request, res: Response) => {
  try {
    //Extract the product ID from the request parameters
    const { productId } = req.params;
    //Validate the partial data using the Zod schema Validation
    const parsedData = productValidationSchema.partial().parse(req.body);
    //Update the product using the validated data
    const result = await productService.updateProduct(
      productId as string,
      parsedData,
    );
    //Send a response with the updated product
    res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    //Handle errors during product update
    res.status(400).json({
      message: 'Failed to update book',
      success: false,
      error,
    });
  }
};

//Controller function to delete a product by its ID
const deleteProduct = async (req: Request, res: Response) => {
  try {
    //Extract the product ID from the request parameters
    const { productId } = req.params;
    //Delete the product using the product ID
    await productService.deleteProduct(productId as string);
    //Send a response with the deleted product
    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
      result: {},
    });
  } catch (error) {
    //Handle errors during product deletion
    res.status(400).json({
      message: 'Failed to delete book',
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
  deleteProduct,
};
