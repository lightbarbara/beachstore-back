import joi from 'joi'

export const cartSchema = joi.object({
    product: joi.string().required(),
    amount: joi.number.required(),
    price: joi.number.required()
})