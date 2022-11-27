export async function getCart(req, res) {

    const cart = res.locals.cart

    return res.status(200).send(cart)

}

export async function createNewCart(req, res) {

    

}

export async function editCart(req, res) {



}

export async function deleteCart(req, res) {



}