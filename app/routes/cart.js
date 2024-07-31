const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();
const Item = require('../models/item');

router.post('/create', async (req, res)=>{
    try {
        const {items} = req.body;

        const newCart = new Cart({ items});
        await newCart.save();
        res.status(201).json(newCart);
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

router.post('/:id/add',async (req, res)=> {

    try {

        const cart = await Cart.findById(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const item = await Item.findById(req.body.itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        const cartItem = cart.items.find(i => i.item.equals(item._id));
        if (cartItem) {
                 cartItem.quantity += req.body.quantity || 1;
        } else {
                 cart.items.push({ item: item._id, quantity: req.body.quantity || 1 });
        }

        cart.totalPrice += item.price * (req.body.quantity || 1);
        const updatedCart = await cart.save();
        res.json(updatedCart);
         
    } catch (err){
        res.status(500).json({message: err.message});
    }
    
})

router.get('/', async (req , res) =>{
    try {
        const cart = await Cart.find();
        res.status(200).json(cart)
    } catch(err){
        res.status(400).json({message:err.message})
    }

})

router.get('/:id', async (req , res)=>{

    try {
        const cart = await Cart.findById(req.params.id ).populate('items.item');
        if (!cart) return res.status(404).json({ message: 'Cart not found!' });
        res.status(200).json(cart);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
})

router.post('/:id/remove', async (req, res)=>{
    try{
        const cart = await Cart.findById(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const cartItemIndex = cart.items.findIndex(i => i.item.equals(req.body.itemId));
        if (cartItemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

        const item = await Item.findById(req.body.itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        cart.totalPrice -= item.price * cart.items[cartItemIndex].quantity;
        cart.items.splice(cartItemIndex, 1);

        const updatedCart = await cart.save();
        res.json(updatedCart);
    }
    catch(err){
        res.status(500).json({ message: err.message});
    }
})

 
router.delete('/:id', async (req, res)=>{
    try{

        const cart = await Cart.findByIdAndDelete(req.params.id)
        if(!cart) return res.status(404).json({message: 'Cart not found'});
        res.status(200).json({ message: 'Cart deleted'});

    } catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router;