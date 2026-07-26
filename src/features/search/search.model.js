import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    bookGenre: {
        type: String,
        required:true
    },
    year: {
        type: Number,
        required:true
    },
    totalPages:{
        type: Number,
        required:true
    },
    readPages: {
        type: Number,
        required:true
    },
    score: {
        type: Number,
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, 
{ 
    timestamps: true 
});

const searchModel = model("Book", bookSchema);

export default searchModel;