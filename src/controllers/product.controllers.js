import { productsCollection } from "../database/db.js"

export async function getProducts(req, res) {

    try {

        const products = await productsCollection.find().toArray()

        res.status(200).send(products)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function newProduct(req, res) {

    let { product, price, image, category } = req.body

    price = Number(price)

    try {

        await productsCollection.insertOne({
            product,
            price,
            image,
            category
        })

        return res.status(200).send({ message: 'Produto cadastrado' })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function updateProduct(req, res) {

    let { product, price, image, category } = req.body

    price = Number(price)

    const { id } = req.params

    try {

        await productsCollection.updateOne({ _id: ObjectId(id) }, {
            $set: {
                product,
                price,
                image,
                category
            }
        })

        return res.status(200).send({ message: 'Produto atualizado' })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function deleteProduct(req, res) {

    const { id } = req.params

    try {

        await productsCollection.deleteOne({ _id: ObjectId(id) })

        res.status(200).send({ message: 'Produto deletado' })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}