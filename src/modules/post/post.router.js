import express from 'express'
import { validation } from "../../middleware/validation.js"
import { isAuth } from './../../middleware/auth.js';
import { addPost, deletePost , getAllPosstOfUserID, getAllPosts, likePostId, updatePost } from './post.controller.js';
import { postSchema } from './post.validation.js';

const postRouter = express.Router()
postRouter.post('/', isAuth ,validation(postSchema) , addPost)
postRouter.put('/:postId', isAuth ,validation(postSchema) , updatePost)
postRouter.delete('/:postId', isAuth , deletePost)
postRouter.get('/', isAuth  , getAllPosts)
postRouter.get('/getPostOfUserId', isAuth  , getAllPosstOfUserID)


postRouter.put('/like/:postId', isAuth , likePostId)





export default postRouter;