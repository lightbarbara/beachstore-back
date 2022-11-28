import joi from 'joi'

export const cartSchema = joi.object({
    products: joi.array().required(),
    price: joi.number().required(),
    userId: joi.required()
})