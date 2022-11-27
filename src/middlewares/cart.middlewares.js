import { sessionsCollection, cartsCollection } from "../database/db"

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

        const cart = await cartsCollection.findOne({userId: session.userId})

        res.locals.cart = cart

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}