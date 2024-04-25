const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : 'Username is required!'
    },

    email:{
        type: String,
        required:'Email is required!'
    },

    password:{
        type: String,
        required:'Password is required!!'
     },
 },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model('User', userSchema);