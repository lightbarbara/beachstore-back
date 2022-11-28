import { Router } from "express";
import { validationProduct, validationProductAuthorization } from "../middlewares/product.middlewares.js";
import { getProducts, newProduct, updateProduct, deleteProduct } from "../controllers/product.controllers.js";

const router = Router()

router.use(validationProductAuthorization)

router.get('/products', getProducts)

router.post('/product', validationProduct, newProduct)

router.put('/product/:id', validationProduct, updateProduct)

router.delete('/product/:id', deleteProduct)

export default router