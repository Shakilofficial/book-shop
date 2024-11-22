import { IProduct } from './product.interface';
import Product from './product.model';

const createProduct = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (searchTerm?: string) => {
  const query = searchTerm
    ? {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { author: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};
  const result = await Product.find(query);
  return result;
};

const getSingleProduct = async (productId: string) => {
  const result = await Product.getSingleProduct(productId);
  return result;
};

const updateProduct = async (productId: string, payload: Partial<IProduct>) => {
  const result = await Product.updateProduct(productId, payload);
  return result;
};

const deleteProduct = async (productId: string) => {
  await Product.deleteProduct(productId);
};

export const productService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
