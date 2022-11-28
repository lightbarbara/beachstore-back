import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouters from './routes/user.routes.js'
import cartRouters from './routes/cart.routes.js'
import productRouters from './routes/product.routes.js'
dotenv.config()

export const app = express()

app.use(express.json())
app.use(cors())
app.use(userRouters)
app.use(cartRouters)
app.use(productRouters)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))