import joi from 'joi'

export const userSignUpSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
})

export const userSignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})