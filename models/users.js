const mongoose = require("mongoose")

const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String, 
        required: true,
    }, 
    last_name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true, 
        unique:true, 
    },
    password: {
        type: String,
        required: true, 
        select: false
    },
  
})


const User = mongoose.model("User", userSchema);
module.exports = User;