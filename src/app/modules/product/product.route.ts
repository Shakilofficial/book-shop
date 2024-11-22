import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

//Define create product route
router.post('/', productController.createProduct);

//Define get single product route
router.get('/:productId', productController.getSingleProduct);

//Define update product route
router.put('/:productId', productController.updateProduct);

//Define delete product route
router.delete('/:productId', productController.deleteProduct);

//Define get all products route
router.get('/', productController.getAllProducts);

export const productRoute = router;
