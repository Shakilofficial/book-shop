//Define the product interface
export interface IProduct {
  title: string;
  author: string;
  price: number;
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious'; //Define the category as a string instead of an enum to allow for custom values in the future if needed
  description: string;
  quantity: number;
  inStock: boolean;
}
