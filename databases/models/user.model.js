import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        minLength: ['3' , 'Name is too short' ],
        maxLength: ['20' , 'Name is too long' ],
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    age : {
        type : Number,
        min: 14,
        max : 100
    },
    phone: {
        type: String,
        min: 7,
        max : 14,
    },
    password : {
        type: String,
        minLength: ['3' , 'password is too short' ],
        required : true
    },
    confirmedEmail: {
        type: Boolean,
        default: false
    },
    profilePic : {
        type : String, 
        default : '/uploads/basicProfile.jpg'
    },
    user_type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, { timestamps : true })

export const userModel = mongoose.model('user' , userSchema)
