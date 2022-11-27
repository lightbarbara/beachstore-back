import { sessionsCollection, cartsCollection } from "../database/db.js"

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

        let cart = await cartsCollection.findOne({userId: session.userId})

        if (cart === undefined) {
            cart = {
                products: [],
                userId: session.userId
            }
        }

        res.locals.cart = cart

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function cartValidation(req, res, next) {

    let cart = res.locals.cart

    const validation = cartSchema.validate(cart, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        return res.status(422).send({ message: errors })
    }

}