import Joi from "joi";

export const signupSchema = Joi.object({
   name: Joi.string().min(3).max(20).required(),
   email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
   phone: Joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).required(),
   password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
   confirm_password: Joi.ref('password'),
   age: Joi.number().min(14).max(100),
   confirmedEmail: Joi.boolean().default(false),
   isVerified: Joi.boolean().default(false),
   user_type: Joi.string().default('user'),
   profilePic: Joi.string()
})

export const signinSchema = Joi.object({
   email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
   password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

