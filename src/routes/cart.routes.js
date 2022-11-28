import { Router } from "express";
import { addToCart, deleteCart, editCart, getCart } from "../controllers/cart.controllers.js";
import { cartPostValidation, cartPutValidation, validationAuthorization } from "../middlewares/cart.middlewares.js";

const router = Router()

router.use(validationAuthorization)

router.get('/cart', getCart)

router.post('/cart', cartPostValidation, addToCart)

// router.put('/cart', cartPutValidation, editCart)

router.delete('/cart', deleteCart)

export default router