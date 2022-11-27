import { Router } from "express";
import { createNewCart, deleteCart, editCart, getCart } from "../controllers/cart.controllers.js";
import { cartValidation, validationAuthorization } from "../middlewares/cart.middlewares.js";

const router = Router()

router.use(validationAuthorization)

router.use(cartValidation)

router.get('/cart', getCart)

router.post('/cart', createNewCart)

router.put('/cart/:id', editCart)

router.delete('/cart:id', deleteCart)

export default router