import { sessionsCollection, cartsCollection } from "../database/db.js"
import { cartSchema } from "../schemas/cart.schema.js"

export async function validationAuthorization(req, res, next) {

    const { authorization } = req.headers

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace('Bearer ', '')

    try {

        const session = await sessionsCollection.findOne({ token })

        if (!session) {
            return res.sendStatus(401)
        }

        const cart = await cartsCollection.findOne({ userId: session.userId })

        res.locals.session = session

        res.locals.cart = cart

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function cartPostValidation(req, res, next) {

    const { products } = req.body

    const session = res.locals.session

    let cart = res.locals.cart

    try {
        if (cart) {

            let newProducts = [...cart.products, ...products]

            await cartsCollection.deleteOne({ userId: session.userId })

            cart = {
                products: newProducts,
                price: newProducts.map(p => p.price).reduce((acc, curValue) => acc + curValue),
                userId: session.userId
            }

        }

        if (!cart) {
            cart = {
                products,
                price: products.map(p => p.price).reduce((acc, curValue) => acc + curValue),
                userId: session.userId
            }
        }

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

    const validation = cartSchema.validate(cart, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        return res.status(422).send({ message: errors })
    }

    res.locals.cart = cart

    next()

}