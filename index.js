import express from 'express'
import dotev from "dotenv"
import { connectDB } from './DB/connection.js'
import authRouter from './src/modules/auth/auth.routes.js'
import categoryRouter from './src/modules/category/category.routes.js'
import taskRouter from './src/modules/task/task.routes.js'

dotev.config()
const app = express()
const port = process.env.PORT
//parse 
app.use(express.json())
// db connection
await connectDB()
// routers
app.use( '/auth', authRouter )
//category
app.use( '/category', categoryRouter )
//Task
app.use('/task',taskRouter)
// page not found hanle
app.all('*',(req,res,next)=>{
    return next( new Error("page not Found",{cause:404}))
})

// global error handler
app.use((error,req,res,next)=>{
    const statusCode = error.cause || 500
    return res.status(statusCode).json({
        sucess : false ,
        message : error.message,
        stack: error.stack

    })
})

app.listen(port, () => console.log(` App listening on port ${port}!`))