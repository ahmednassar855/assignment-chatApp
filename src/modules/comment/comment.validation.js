import Joi from "joi";

export const commentSchema = Joi.object({
    comment : Joi.string().min(3).max(100).required(),
 })
 