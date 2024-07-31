const express = require('express');
const Item = require('../models/item');
const router = express.Router();



router.post('/create',async (req, res)=> {

    try {
        const { itemName, description, price, quantity,imageUrl } = req.body;

        const newItem = new Item({ itemName, description, price, quantity, imageUrl });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err){
        res.status(400).json({message: err.message})
    }
    
})

router.get('/', async (req , res) =>{
    try {
        const item = await Item.find();
        res.status(200).json(item)
    } catch(err){
        res.status(400).json({message:err.message})
    }

})

router.get('/:id', async (req , res)=>{

    try {
        const item = await Item.findById(req.params.id );
        if (!item) return res.status(404).json({ message: 'Item not found!' });
        
         
        res.status(200).json(item);


    } catch (err){
        res.status(500).json({ message: err.message });
    }
})

router.put('/update/:id', async (req, res)=>{
    try{
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { new:true }
        );

        if (!item) return res.status(404).json({ message: 'Item not found!' });
        
        res.status(200).json(item);
        
    } catch(err){
        res.status(400).json({message: err.message});
    }
})

router.delete('/:id', async (req, res)=>{
    try{

        const item = await Item.findByIdAndDelete(req.params.id)
        if(!item) return res.status(404).json({message: 'Item not found'});
        res.status(200).json({ message: 'Item deleted'});

    } catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router;