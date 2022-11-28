import { Router } from "express";
import { addToCart, deleteItem, getCart } from "../controllers/cart.controllers.js";
import { cartPostValidation, validationAuthorization } from "../middlewares/cart.middlewares.js";

const router = Router()

router.use(validationAuthorization)

router.get('/cart', getCart)

router.post('/cart', cartPostValidation, addToCart)

router.delete('/cart', deleteItem)

export default router