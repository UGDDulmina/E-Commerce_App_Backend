const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: 
    [
        {
            item:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Item',
                required:true
            },
            quantity: {
                type: Number,
                default: 1
              }
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
      }

})

module.exports = mongoose.model('cart',cartSchema)