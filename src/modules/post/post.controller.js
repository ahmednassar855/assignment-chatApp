import { catchAsyncHandler } from "../../utils/catchAsyncError.js";
import { postModel } from './../../../databases/models/post.model.js';


export const addPost = catchAsyncHandler(async (req, res) => {
    const { post } = req.body;
    const userdata = req.userData;
    let newPost = new postModel({ post, postedBy: userdata._id })
    await newPost.save()
    res.json({ message: "Add post Successfully", newPost })
})

export const updatePost = catchAsyncHandler(async (req, res) => {
    const userdata = req.userData;
    const { postId } = req.params;
    const { post } = req.body;

    let checkPostIsExist = await postModel.findById({ _id: postId })
    if (!checkPostIsExist) return res.json({ message: "post id is not exist" })

    if (checkPostIsExist.postedBy == userdata._id) {
        let newPost = new postModel({ post, postedBy: userdata._id })
        await newPost.save()
        res.json({ message: "update post Successfully", userdata, checkPostIsExist })
    } else {
        res.json({ message: "You are not authrized to edit this post" })
    }
})

export const getAllPosts = catchAsyncHandler(async (req, res) => {
    let posts = await postModel.find({})
    if (!posts) return res.json({ message: "empty posts" })
    res.json({ message: "Get all post Successfully", posts })
})

export const getAllPosstOfUserID = catchAsyncHandler(async (req, res) => {
    const userdata = req.userData;
    let posts = await postModel.find({ postedBy: userdata._id })
    if (!posts) return res.json({ message: "empty posts" })
    res.json({ message: "Get all post Successfully", posts })
})

export const deletePost = catchAsyncHandler(async (req, res) => {
    const userdata = req.userData;
    const { postId } = req.params;

    let checkPostIsExist = await postModel.findOne({ _id: postId })
    console.log(checkPostIsExist);
    if (!checkPostIsExist) return res.json({ message: "post id is not exist" })

    if (checkPostIsExist.postedBy == userdata._id) {
        let deletePost = await postModel.findOneAndDelete({ _id: postId })
        res.json({ message: "delete post Successfully", deletePost })
    } else {
        res.json({ message: "You are not authrized to delete this post" })
    }
})

export const likePostId = catchAsyncHandler(async (req, res) => {
    const userdata = req.userData;
    const { postId } = req.params;
    let checkPostIfExist = await postModel.findById(postId);
    if (!checkPostIfExist) return res.json({ message: "post is not found" })
    if ( checkPostIfExist.likeId.indexOf(userdata._id) >=0 ){
        let likeToPostId = await postModel.findByIdAndUpdate(postId, { $addToSet: { removelikeId: [userdata._id] } ,  $pull: { likeId: userdata._id }}, { new: true })
        likeToPostId.totalLike = likeToPostId.likeId.length - likeToPostId.removelikeId.length 
        await likeToPostId.save()
        res.json({ message: "dislike to post Successfully" , likeToPostId})
    }else{
        let likeToPostId = await postModel.findByIdAndUpdate(postId, { $addToSet: { likeId: [userdata._id] } ,  $pull: { removelikeId: userdata._id } }, { new: true })
        likeToPostId.totalLike = likeToPostId.likeId.length - likeToPostId.removelikeId.length 
        await likeToPostId.save()
        res.json({ message: "like to post Successfully", likeToPostId })
    }
   
})

