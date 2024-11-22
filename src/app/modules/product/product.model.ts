import { Model, model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

interface ProductModel extends Model<IProduct> {
  getSingleProduct(productId: string): Promise<IProduct | null>;
  updateProduct(
    productId: string,
    payload: Partial<IProduct>,
  ): Promise<IProduct | null>;
  deleteProduct(productId: string): Promise<void>;
}

const productSchema = new Schema<IProduct, ProductModel>(
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
      enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
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

// Static Methods for Getting Single Product
productSchema.statics.getSingleProduct = async function (productId: string) {
  const result = await this.findById(productId);
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

// Static Methods for Updating Product
productSchema.statics.updateProduct = async function (
  productId: string,
  payload: Partial<IProduct>,
) {
  const result = await this.findById(productId);
  if (!result) {
    throw new Error('Product not found');
  }
  const updatedProduct = await this.findByIdAndUpdate(
    productId,
    { $set: payload },
    {
      new: true,
    },
  );
  return updatedProduct;
};

// Static Methods for Deleting Product
productSchema.statics.deleteProduct = async function (productId: string) {
  const result = await this.findById(productId);
  if (!result) {
    throw new Error('Product not found');
  }
  await this.findByIdAndDelete(productId);
};

const Product = model<IProduct, ProductModel>('Product', productSchema);

export default Product;
