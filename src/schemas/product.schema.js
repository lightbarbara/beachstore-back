import joi from 'joi'

export const productSchema = joi.object({
    product: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().required(),
    category: joi.string().required()
})