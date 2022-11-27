import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/user.controllers.js";
import { validationUserSignIn, validationUserSignUp, userValidationAuthorization } from "../middlewares/user.middlewares.js";

const router = Router()

router.post('/', validationUserSignIn, signIn)

router.post('/sign-up', validationUserSignUp, signUp)

router.delete('/', userValidationAuthorization, signOut)

export default router