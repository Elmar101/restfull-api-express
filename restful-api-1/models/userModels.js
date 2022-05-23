const   { Schema , model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        lowercase: true,
        maxlength: 10
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    } 

},{collection: "Users", timestamps: true});

const UserModel =  model('User',userSchema);

module.exports = UserModel;