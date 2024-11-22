import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

//Define the order schema
const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
      type: String,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price must be a positive number'],
    },
  },
  { timestamps: true },
);

const Order = model<IOrder>('Order', orderSchema);

export default Order;
