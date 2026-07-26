import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        maxlength:8
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate:{
            validator: validator.isEmail,
            message: "e-mail inválido"
        }
    }
});

const user = model("user", userSchema);

export default user;