const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required:true,
    },
    quantity:{
        type: Number,
        default: 1,
    },
    imageUrl: String
},{timestamps: true})

module.exports = mongoose.model('item',itemSchema)