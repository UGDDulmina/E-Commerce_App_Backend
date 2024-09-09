const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    }
},{timestamps: true})

module.exports = mongoose.model('admin', adminSchema)