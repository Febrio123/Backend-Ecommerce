
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import authRouter from "./routes/authRouter.js"
import productRouter from "./routes/productRouter.js"
import orderRouter from "./routes/orderRouter.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

const app = express()
const port = 3000

// middleware

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public/uploads'))
app.use(helmet())
app.use(mongoSanitize())

// parent Route
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)

app.use(notFound)
app.use(errorHandler)

// connection DB
dotenv.config()
mongoose.connect(process.env.DATABASE, {
}).then(() => {
    console.log("Database connect")
})

app.listen(port, () => {
    console.log(`Server running`)
})