import { Router } from "express";
import { addToCart, deleteCart, deleteItem, getCart, makeSale } from "../controllers/cart.controllers.js";
import { cartPostValidation, validationAuthorization } from "../middlewares/cart.middlewares.js";

const router = Router()

router.use(validationAuthorization)

router.get('/cart', getCart)

router.post('/cart', cartPostValidation, addToCart)

router.delete('/cart', deleteCart)

router.delete('/cart/:id', deleteItem)

router.post('/sale', makeSale)

export default router