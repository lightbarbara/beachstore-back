import { sessionsCollection, usersCollection } from "../database/db.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/user.schema.js";
import bcrypt from 'bcrypt'

export async function validationUserSignIn(req, res, next) {

    const { email, password } = req.body

    const validation = userSignInSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    try {

        const userExists = await usersCollection.findOne({ email })

        const validatePassword = bcrypt.compareSync(password, userExists.password)

        if (!userExists || !validatePassword) {
            res.status(401).send({ message: 'Dados incorretos' })
            return
        }

        const userLoggedIn = await sessionsCollection.findOne({ userId: userExists._id })

        if (userLoggedIn) {
            await sessionsCollection.deleteOne({ userId: userLoggedIn.userId })
        }

        res.locals.user = userExists

        next()

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function validationUserSignUp(req, res, next) {

    const { name, email, password } = req.body

    const validation = userSignUpSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    try {

        const userExists = await usersCollection.findOne({ email })

        if (userExists) {
            res.status(409).send({ message: 'Usuário já cadastrado' })
            return
        }

        res.locals.user = { name, email, password }

        next()

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function userValidationAuthorization(req, res, next) {

    const { authorization } = req.headers

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace('Bearer ', '')

    try {

        const session = await sessionsCollection.findOne({ token })

        if (!session) {
            res.status(401).send({message: 'Usuário já está deslogado'})
            return
        }

        const user = await usersCollection.findOne({ _id: session.userId })

        res.locals.user = user

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}