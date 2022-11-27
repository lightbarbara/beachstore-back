import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/user.controllers";
import { validationUserSignIn, validationUserSignUp, userValidationAuthorization } from "../middlewares/user.middlewares";

const router = Router()

router.post('/', validationUserSignIn, signIn)

router.post('/sign-up', validationUserSignUp, signUp)

router.delete('/', userValidationAuthorization, signOut)

export default router