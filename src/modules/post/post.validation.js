import Joi from "joi";

export const postSchema = Joi.object({
    post : Joi.string().min(3).max(100).required(),
 })
 