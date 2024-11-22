import Product from '../product/product.model';
import { IOrder } from './order.interface';
import Order from './order.model';

//Function to create an order
const createOrder = async (payload: IOrder) => {
  // Find the product by its ID
  const product = await Product.findById(payload.product);
  if (!product) {
    // If the product is not found, throw an error
    throw new Error('Product not found');
  }
  //Check if the requested quantity is available in stock
  if (product.quantity < payload.quantity) {
    // If not, throw an error
    throw new Error('Not enough quantity in stock');
  }
  //Calculate the total price of the order
  const totalPrice = product.price * payload.quantity;
  //Create the order with the provided payload and calculate the total price
  const order = await Order.create({
    ...payload,
    totalPrice,
  });

  //Deduct the ordered quantity from the product's stock quantity
  product.quantity -= payload.quantity;
  //Update the inStock property of the product
  if (product.quantity === 0) {
    product.inStock = false;
  }
  //Save the updated product
  await product.save();
  //Return the created order
  return order;
};

//Function to calculate the revenue of all orders
const calculateRevenue = async () => {
  //Aggregate the orders and calculate the total revenue
  const revenue = await Order.aggregate([
    {
      //Join with the product collection to get the product details
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product',
      },
    },
    // $unwind the product array to work with each product
    { $unwind: '$product' },
    {
      //Project the total revenue for each order
      $project: {
        totalRevenue: { $multiply: ['$quantity', '$product.price'] },
      },
    },
    //Group the orders by null and calculate the sum of total revenue
    { $group: { _id: null, totalRevenue: { $sum: '$totalRevenue' } } },
  ]);
  //Return the total revenue or 0 if no orders are found
  return revenue[0]?.totalRevenue || 0;
};

export const orderService = {
  createOrder,
  calculateRevenue,
};
