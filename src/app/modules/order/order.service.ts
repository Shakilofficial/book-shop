import Product from '../product/product.model';
import { IOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (payload: IOrder) => {
  const product = await Product.findById(payload.product);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.quantity < payload.quantity) {
    throw new Error('Not enough quantity in stock');
  }

  const totalPrice = product.price * payload.quantity;

  const order = await Order.create({
    ...payload,
    totalPrice,
  });

  product.quantity -= payload.quantity;
  if (product.quantity === 0) {
    product.inStock = false;
  }
  await product.save();
  return order;
};

const calculateRevenue = async () => {
  const revenue = await Order.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    {
      $project: {
        totalRevenue: { $multiply: ['$quantity', '$product.price'] },
      },
    },
    { $group: { _id: null, totalRevenue: { $sum: '$totalRevenue' } } },
  ]);
  return revenue[0]?.totalRevenue || 0;
};

export const orderService = {
  createOrder,
  calculateRevenue,
};
