const mongoose = require('mongoose'); // Importing mongoose

// Creating schema for user
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    hashedPassword : {
        type : String,
        required : true,
        trim : true
    },
    typeOfUser : {
        type : String,
        required : true,
        trim : true,
        default : "Normal user"
    },
    isActivated : {
        type : Boolean,
        default : false
    },
    accountActivationToken : {
        type : String,
        trim : true,
        default : ""
    },
    resetPasswordToken : {
        type : String,
        trim : true,
        default : ""
    },
    notes : {
        type : Array,
        default : []
    }
});

// Creating and exporting users model
module.exports = mongoose.model("users", userSchema);