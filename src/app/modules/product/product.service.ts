import { IProduct } from './product.interface';
import Product from './product.model';

//Function to create a product
const createProduct = async (payload: IProduct) => {
  //Create a new product using the provided payload
  const result = await Product.create(payload);
  //Return the created product
  return result;
};

//Function to get all products, optionally filtered by a search term
const getAllProducts = async (searchTerm?: string) => {
  //Build a query object to search for products by title, author, or category
  const query = searchTerm
    ? {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { author: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};
  //Find products using the built query
  const result = await Product.find(query);
  //Return the found products
  return result;
};

//Function to get a single product by its ID
const getSingleProduct = async (productId: string) => {
  //Use the Static Methods of the Product Model to get a single product by its ID
  const result = await Product.getSingleProduct(productId);
  //Return the found product
  return result;
};

//Function to update a product by its ID
const updateProduct = async (productId: string, payload: Partial<IProduct>) => {
  //Use the Static Methods of the Product Model to update a product by its ID
  const result = await Product.updateProduct(productId, payload);
  // Return the updated product
  return result;
};

//Function to delete a product by its ID
const deleteProduct = async (productId: string) => {
  //Use the Static Methods of the Product Model to delete a product by its ID
  await Product.deleteProduct(productId);
};

export const productService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
