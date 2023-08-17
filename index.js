import express from "express"
import { connect } from "mongoose";
import dotenv from 'dotenv'
import userAuth from './routes/auths.js'
import dishes from './routes/dishes.js'
import cookieParser from "cookie-parser"
import cors from 'cors'

dotenv.config();

const connectToDB = () => {
    connect(process.env.MONGOURI, {dbName: "food-delivery"})
    .then(() => console.log('connected to DB'))
    .catch((err) => console.log(err))
}

const app = express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/auths', userAuth);
app.use('/api/dish', dishes);


app.get('/', (req, resp) => {
    console.log("object")
    resp.send('Hello I am Awadhesh')
})

app.use((err, req, resp, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return resp.status(status).json({success: false, status, message})
})

const port = parseInt(process.env.PORT)
app.listen(port, () => {
    connectToDB()
    console.log(`Server is running on port ${port}`)
})