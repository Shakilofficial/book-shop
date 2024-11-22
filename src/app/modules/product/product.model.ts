import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Fiction',
        'Science',
        'SelfDevelopment',
        'Non-Fiction',
        'Poetry',
        'Religious',
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

const Product = model<IProduct>('Product', productSchema);

export default Product;
