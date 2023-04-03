import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment : {
        type : String,
        minLength: ['3' , 'Name is too short' ],
        maxLength: ['100' , 'Name is too long' ],
        required : true
    },
    commentedBy: {
        type: mongoose.Types.ObjectId,
        ref : 'user',
        required: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref : 'post',
        required: true
    },
    totalLike : {
        type : Number,
        default :0
    },
    likeId :  [{ type: mongoose.Types.ObjectId,  ref : 'user'}],
    removelikeId :  [{ type: mongoose.Types.ObjectId,  ref : 'user'}]
}, { timestamps : true })

export const commentModel = mongoose.model('comment' , commentSchema)
