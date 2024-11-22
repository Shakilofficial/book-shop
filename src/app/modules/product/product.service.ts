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
export const productService = {
  createProduct,
  getAllProducts,
};
