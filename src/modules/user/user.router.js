import express from 'express'

import { validation } from "../../middleware/validation.js"
import { forgetPassword , passwordToReset ,updateUserByUserId } from "./user.controller.js"
import { isAuth } from './../../middleware/auth.js';
import { emailSchema, passwordSchema, updateUserSchema } from "./user.validation.js";


const userRouter = express.Router()

userRouter.post('/forget_password',validation(emailSchema) , forgetPassword)
userRouter.post('/passwordReset/:token', validation(passwordSchema) , passwordToReset)
userRouter.put('/update' , isAuth , validation(updateUserSchema) , updateUserByUserId)

export default userRouter;