import mongoose from "mongoose"

export const dbConnection = () => {
    // mongoose.set('debug' , true)
    mongoose.connect('mongodb://127.0.0.1:27017/chatApp').then( () => {
        console.log('data base connected successfully');
    }).catch( (err) => {
        console.log('disconnected');
    })
}