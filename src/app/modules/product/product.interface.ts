export interface IProduct { 
    title: string;
    author: string;
    price: number;
    category: "Fiction" | "Science" | "SelfDevelopment" | "Non-Fiction" | "Poetry" | "Religious";
    description: string;
    quantity: number;
    inStock: boolean;
}