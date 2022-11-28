import { sessionsCollection } from "../database/db.js"
import { productSchema } from "../schemas/product.schema.js"

export async function validationProductAuthorization(req, res, next) {

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

        res.locals.session = session

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export function validationProduct(req, res, next) {

    const validation = productSchema.validate(req.body, { abortEarly: false })

    try {
        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message)
            
            return res.status(422).send({ message: errors })
        }
        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}