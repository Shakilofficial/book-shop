import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/:productId', productController.getSingleProduct);
router.get('/', productController.getAllProducts);

export const productRoute = router;