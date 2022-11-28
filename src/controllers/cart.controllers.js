import { cartsCollection, salesCollection } from "../database/db.js"

export function getCart(req, res) {

    const cart = res.locals.cart

    return res.status(200).send(cart)

}

export async function addToCart(req, res) {

    const cart = res.locals.cart

    try {

        await cartsCollection.insertOne(cart)

        return res.status(200).send({ message: 'Item(ns) adicionado(s)' })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function deleteCart(req, res) {

    const cart = res.locals.cart

    try {

        await cartsCollection.deleteOne({ userId: cart.userId })

        return res.sendStatus(200)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function deleteItem(req, res) {



}

export async function makeSale(req, res) {

    const sale = req.body

    console.log(sale)

    try {

        await salesCollection.insertOne(sale)

        return res.status(200).send({ message: 'Venda concluída' })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}