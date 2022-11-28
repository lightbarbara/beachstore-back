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

            // const productsInCart = cart.products.map(p => p.product)

            // console.log(productsInCart)

            // console.log(products)

            // for (let i = 0; i < products; i++) {
            //     if (productsInCart.includes(products[i].product)) {

            //         console.log(products[i].product)

            //         newProducts.append({
            //             product: products[i].product,
            //             price: products[i].price,
            //             amount: products[i].amount
            //         })
            //     }
            // }

            await cartsCollection.deleteOne({ userId: session.userId })

            cart = {
                products: newProducts,
                price: newProducts.map(p => (p.price * p.amount)).reduce((acc, curValue) => acc + curValue),
                userId: session.userId
            }

        }

        if (!cart) {
            cart = {
                products,
                price: products.map(p => (p.price * p.amount)).reduce((acc, curValue) => acc + curValue),
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

export async function cartPutValidation(req, res, next) {

    const { products } = req.body

    const session = res.locals.session

    let cart = res.locals.cart

    if (!cart) {
        return res.status(401).send({ message: 'Você não pode atualizar um produto sem ter um carrinho' })
    }

    const validation = cartSchema.validate(cart, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        return res.status(422).send({ message: errors })
    }

    try {

        await cartsCollection.updateOne({ userId: session.userId }, {
            $set: {
                products
            }
        })

        res.status(200).send({ message: 'Carrinho atualizado' })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

    next()

}