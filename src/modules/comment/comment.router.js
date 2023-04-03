import express from 'express'
import { validation } from "../../middleware/validation.js"
import { isAuth } from './../../middleware/auth.js';
import { commentSchema } from './comment.validation.js';
import { addComment , deleteCommentByUserId, getAllCommentsOfUserID, likeCommentId, updateCommentByUserId } from './comment.controller.js';

const commentRouter = express.Router()

commentRouter.post('/:postId', isAuth ,validation(commentSchema) , addComment)
commentRouter.put('/:commentId', isAuth ,validation(commentSchema) , updateCommentByUserId)
commentRouter.delete('/:commentId', isAuth  , deleteCommentByUserId)
commentRouter.get('/', isAuth  , getAllCommentsOfUserID)

commentRouter.put('/comment/:commentId', isAuth , likeCommentId)



export default commentRouter;