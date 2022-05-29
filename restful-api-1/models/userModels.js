const   { Schema , model} = require("mongoose");
const Joi = require('joi');

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

//Joi validation 
const schema = Joi.object({
    name: Joi.string().trim().min(3).max(10),
    userName: Joi.string().trim().min(5).max(20),
    email: Joi.string().trim().email(),
    password: Joi.string().trim()
})

//Joi validation modelden evel olmalidi !!!
userSchema.methods.joiValidation = function(userObject){
    schema.required();
    return schema.validate(userObject);
}

userSchema.methods.toJSON = function(){
    const user = this.toObject();
    delete user.createAt
    delete user.updateAt
    return user;
}

//Joi validation for update 
userSchema.statics.joiValidationForUpdate = function(userObject){
    return schema.validate(userObject);
}


const UserModel =  model('User',userSchema);

module.exports = UserModel;