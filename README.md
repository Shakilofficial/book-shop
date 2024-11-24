![Book Shop](https://res.cloudinary.com/dcyupktj6/image/upload/v1732318077/nwoqklwqsdc6n8ntiarf.png)

---

## Introduction

A robust Express application built with TypeScript, designed to manage a Book Store using MongoDB and Mongoose for data management and validation.

## Project Description

The Book Shop project aims to provide a comprehensive backend solution for managing books and orders in a book store. It leverages Express for server-side logic, TypeScript for type safety, and MongoDB with Mongoose for database operations. The project ensures data integrity through schema validation and supports CRUD operations for books and orders.

## Features

- CRUD operations for managing books and orders.
- Inventory management with automatic stock updates.
- Revenue calculation from orders using aggregation.
- Comprehensive error handling and validation.
- Built with TypeScript for enhanced code quality and maintainability.

## Technology Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Cors
- Zod for validation

## Installation Guideline

Instructions on how to install, configure, and get the project running locally.

### Prerequisites

- Node.js (version 18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Shakilofficial/book-shop
   cd book-shop
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.

   ```bash
   PORT=3000
   DATABASE_URI=your_db_connection_uri
   ```

3. Ensure MongoDB is running and accessible.

## Usage

To start the server in development mode, run:

```bash
npm run dev
```

To start the server in production mode, run:

```bash
npm run start:prod
```

## API Endpoints

| Method | Endpoint                   | Description                                   |
| ------ | -------------------------- | --------------------------------------------- |
| POST   | `/api/products`            | Create a new book                             |
| GET    | `/api/products`            | Retrieve all books                            |
| GET    | `/api/products/:productId` | Retrieve details of a specific book by ID     |
| PUT    | `/api/products/:productId` | Update details of a specific book by ID       |
| DELETE | `/api/products/:productId` | Delete a specific book by ID                  |
| POST   | `/api/orders`              | Place an order for a book                     |
| GET    | `/api/orders`              | Retrieve all orders                           |
| GET    | `/api/orders/revenue`      | Calculate total revenue from completed orders |

### Example Requests

#### Create a Book

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 10,
  "category": "Fiction",
  "description": "A story about the American dream.",
  "quantity": 100,
  "inStock": true
}
```

**Checkout more Product Routes api endpoints [here](#api-endpoints)**

#### Order a Book

```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 30
}
```

#### Calculate Revenue

```json
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 450 // Total revenue calculated from all orders
  }
}
```

## Error Handling

The application provides detailed error responses for validation failures and other errors, ensuring clarity and ease of debugging.

### Validation Errors

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "price": {
        "message": "Price must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Price must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "price",
        "value": -5 // Invalid price value
      }
    }
  },
```

---

## Contact

For questions or collaboration, please contact me via:

- **Email**: [mrshakilhossain@outlook.com](mailto:mrshakilhossain@outlook.com)
- **LinkedIn**: [https://www.linkedin.com/in/your-profile](https://www.linkedin.com/in/your-profile)

- **Facebook**: [https://www.facebook.com/iamshakilhossain](https://www.facebook.com/iamshakilhossain)
- **Portfolio**: [https://shakilhossain-sigma.vercel.app](https://shakilhossain-sigma.vercel.app)

---

Copyright © 2024 [Md Shakil Hossain](https://github.com/Shakilofficial).<br />
This project is [MIT](https://github.com/Shakilofficial/book-shop/blob/main/LICENSE) licensed.
