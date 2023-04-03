import express from 'express'
import { dbConnection } from './databases/dbConnection.js'
import authRouter from './src/modules/auth/auth.router.js'
import userRouter from './src/modules/user/user.router.js';
import postRouter from './src/modules/post/post.router.js';
import commentRouter from './src/modules/comment/comment.router.js';

const app = express()
const port = 3000

import * as dotenv from 'dotenv'
dotenv.config()

app.use(express.json())
app.use('/api/users' , authRouter)
app.use('/api/users' , userRouter)
app.use('/api/posts' , postRouter)
app.use('/api/comments' , commentRouter)





app.get('/', (req, res) => res.send('Hello World!'))


app.use(( err , req , res , next ) => {
    res.json(err)
})
dbConnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))