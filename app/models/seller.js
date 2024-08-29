const mongoose = require('mongoose');
const { type } = require('os');

const sellerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    telephoneNumbers:{
        type: Number
    },
    socialMediaLinks:{
        type: String
    },
    email: {
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    }
    
})

module.exports = mongoose.model('seller',sellerSchema)