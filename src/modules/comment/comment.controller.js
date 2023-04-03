import { catchAsyncHandler } from "../../utils/catchAsyncError.js";
import { postModel } from './../../../databases/models/post.model.js';
import { commentModel } from './../../../databases/models/comment.model.js';


export const addComment = catchAsyncHandler(async (req, res) => {
    const { comment } = req.body;
    const { postId } = req.params;
    const userdata = req.userData;
    let postIsExist = await postModel.findOne({ _id: postId })
    if (!postIsExist) return res.json({ message: "this post id is not exist" })
    let newComment = new commentModel({ comment, commentedBy: userdata._id, postId })
    await newComment.save()
    res.json({ message: "Add comment Successfully", newComment })
})

export const updateCommentByUserId = catchAsyncHandler(async (req, res) => {
    const userdata = req.userData;
    const { commentId } = req.params;
    const { comment } = req.body;
    let updateComment = await commentModel.findOneAndUpdate({ _id: commentId, commentedBy: userdata._id }, { comment }, { new: true })
    console.log(updateComment);
    if (!updateComment) return res.json({ message: " This comment is not found" })
    res.json({ message: "update post Successfully", updateComment })
})

export const deleteCommentByUserId = catchAsyncHandler(async (req, res) => {
    const userdata = req.userData;
    const { commentId } = req.params;
    const { comment } = req.body;
    let deleteComment = await commentModel.findOneAndDelete({ _id: commentId, commentedBy: userdata._id }, { comment }, { new: true })
    console.log(deleteComment);
    if (!deleteComment) return res.json({ message: " This comment is not found" })
    res.json({ message: "Delete post Successfully", deleteComment })
})

export const getAllCommentsOfUserID = catchAsyncHandler(async (req, res) => {
    const userdata = req.userData;
    console.log(userdata);
    let comments = await commentModel.find({ commentedBy: userdata._id })
    if (!comments) return res.json({ message: "empty comments" })
    res.json({ message: "Get all comments Successfully", comments })
})


export const likeCommentId = catchAsyncHandler(async (req, res) => {
    const userdata = req.userData;
    const { commentId } = req.params;
    let checkCommentIfExist = await commentModel.findById(commentId);
    if (!checkCommentIfExist) return res.json({ message: "commment is not found" })
    if ( checkCommentIfExist.likeId.indexOf(userdata._id) >=0 ){
        let likeToCommentId = await commentModel.findByIdAndUpdate(commentId, { $addToSet: { removelikeId: [userdata._id] } ,  $pull: { likeId: userdata._id }}, { new: true })
        likeToCommentId.totalLike = likeToCommentId.likeId.length - likeToCommentId.removelikeId.length 
        await likeToCommentId.save()
        res.json({ message: "dislike to comment Successfully" , likeToCommentId})
    }else{
        let likeToCommentId = await postModel.findByIdAndUpdate(commentId, { $addToSet: { likeId: [userdata._id] } ,  $pull: { removelikeId: userdata._id } }, { new: true })
        likeToCommentId.totalLike = likeToCommentId.likeId.length - likeToCommentId.removelikeId.length 
        await likeToCommentId.save()
        res.json({ message: "like to comment Successfully", likeToCommentId })
    }
   
})

