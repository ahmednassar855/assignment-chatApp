import express  from "express"
import { signIn, signUp, verifyUser } from "./auth.controller.js";
import { signinSchema, signupSchema } from "./auth.validation.js";
import { validation } from './../../middleware/validation.js';

const authRouter = express.Router()



authRouter.post('/signup',validation(signupSchema) , signUp)
authRouter.post('/signin',validation(signinSchema) , signIn)
authRouter.get('/verify/:token' , verifyUser)




export default authRouter;