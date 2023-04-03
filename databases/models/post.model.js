import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    post : {
        type : String,
        minLength: ['3' , 'Name is too short' ],
        maxLength: ['100' , 'Name is too long' ],
        required : true
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref : 'user',
        required: true
    },
    totalLike : {
        type : Number,
        default :0
    },
    likeId :  [{ type: mongoose.Types.ObjectId,  ref : 'user'}],
    removelikeId :  [{ type: mongoose.Types.ObjectId,  ref : 'user'}]

}, { timestamps : true })

export const postModel = mongoose.model('post' , postSchema)
