import { usersCollection, sessionsCollection } from "../database/db.js";
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export async function signIn(req, res) {

    const user = res.locals.user

    try {

        const token = uuid()

        await sessionsCollection.insertOne({
            token,
            userId: user._id
        })

        return res.status(200).send({ 'token': token })

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function signUp(req, res) {

    const { name, email, password } = res.locals.user

    const encryptedPassword = bcrypt.hashSync(password, 15)

    try {

        await usersCollection.insertOne({
            name,
            email,
            password: encryptedPassword
        })

        res.status(201).send({ message: 'Usuário criado' })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function signOut(req, res) {

    const user = res.locals.user

    try {

        await sessionsCollection.deleteOne({ userId: user._id })

        return res.status(200).send({ message: 'Usuário deslogado' })

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

}