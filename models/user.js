import { Schema, model } from "mongoose";

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
    },
}, {collection: 'user'})

export default model('userAuth', schema);