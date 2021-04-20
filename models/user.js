const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const UserSchema  = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
        
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    mobileNumber:{
        type: Number,
        required: true
    }

})
UserSchema.plugin(uniqueValidator)
const User= mongoose.model('User',UserSchema);

module.exports = User;