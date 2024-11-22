import { Model, model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

//Define the product schema
interface ProductModel extends Model<IProduct> {
  //Define the getSingleProduct method
  getSingleProduct(productId: string): Promise<IProduct | null>;
  //Define the updateProduct method
  updateProduct(
    productId: string,
    payload: Partial<IProduct>,
  ): Promise<IProduct | null>;
  //Define the deleteProduct method
  deleteProduct(productId: string): Promise<void>;
}

//Define the product model
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
  //Find a product by its ID
  const result = await this.findById(productId);
  //Check if the product was found
  if (!result) {
    //Throw an error if the product was not found
    throw new Error('Product not found');
  }
  //Return the found product
  return result;
};

// Static Methods for Updating Product
productSchema.statics.updateProduct = async function (
  productId: string,
  payload: Partial<IProduct>,
) {
  //Find a product by its ID
  const result = await this.findById(productId);
  //Check if the product was found
  if (!result) {
    //Throw an error if the product was not found
    throw new Error('Product not found');
  }
  //Update the product with the provided payload
  const updatedProduct = await this.findByIdAndUpdate(
    productId,
    { $set: payload },
    {
      new: true,
    },
  );
  //Return the updated product
  return updatedProduct;
};

// Static Methods for Deleting Product
productSchema.statics.deleteProduct = async function (productId: string) {
  //Find a product by its ID
  const result = await this.findById(productId);
  //Check if the product was found
  if (!result) {
    //Throw an error if the product was not found
    throw new Error('Product not found');
  }
  //Delete the product
  await this.findByIdAndDelete(productId);
};

const Product = model<IProduct, ProductModel>('Product', productSchema);

export default Product;
