import { Router } from "express";
import { createNewCart, deleteCart, editCart, getCart } from "../controllers/cart.controllers";
import { validationAuthorization } from "../middlewares/user.middlewares";

const router = Router()

router.use(validationAuthorization)

router.get('/cart', getCart)

router.post('/cart', createNewCart)

router.put('/cart/:id', editCart)

router.delete('/cart:id', deleteCart)

export default router