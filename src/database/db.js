import { MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const mongoclient = new MongoClient(process.env.MONGO_URI)

try {
    await mongoclient.connect()
    console.log('MongoDB connected')
} catch (err) {
    console.log(err)
}

const db = mongoclient.db('beach-store')
export const usersCollection = db.collection('users')
export const productsCollection = db.collection('products')
export const sessionsCollection = db.collection('sessions')
export const cartsCollection = db.collection('carts')
export const salesCollection = db.collection('sales')