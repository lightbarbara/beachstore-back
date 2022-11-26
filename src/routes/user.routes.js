import { Router } from "express";

const router = Router()

router.post('/', signIn)

router.post('/sign-up', signUp)

router.delete('/', signOut)

export default router