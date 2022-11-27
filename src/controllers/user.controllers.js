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

        return res.status(200).send({
            'token': token,
            'name': user.name
        })

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function signUp(req, res) {

}

export async function signOut(req, res) {

}