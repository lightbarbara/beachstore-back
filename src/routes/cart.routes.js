import { Router } from "express";

const router = Router()

router.get('/cart', getCart)

router.post('/cart', createNewCart)

router.put('/cart/:id', editCart)

router.delete('/cart:id', deleteCart)

export default router