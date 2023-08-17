import { Schema, model } from "mongoose";

const schema = await Schema({
    ownerId: {
        type: String,
        required: true
    },
    dishName: {
        type: String,
        required: true
    },
    dishPic: {
        type: String,
        required: true
    }
})

export default model('burger', schema)