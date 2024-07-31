const express = require('express');
const Buyer = require('../models/buyer');
const router = express.Router();



router.post('/create',async (req, res)=> {

    try {
        const { firstName, lastName, email, password } = req.body;

        const newBuyer = new Buyer({ firstName, lastName, email, password });
        await newBuyer.save();
        res.status(201).json(newBuyer);
    } catch (err){
        res.status(400).json({message: err.message})
    }
    
})

router.get('/', async (req , res) =>{
    try {
        const buyer = await Buyer.find();
        res.status(200).json(buyer)
    } catch(err){
        res.status(400).json({message:err.message})
    }

})

router.get('/:id', async (req , res)=>{

    try {
        const buyer = await Buyer.findById(req.params.id );
        if (!buyer) return res.status(404).json({ message: 'Buyer not found!' });
        
         
        res.status(200).json(buyer);


    } catch (err){
        res.status(500).json({ message: err.message });
    }
})

router.put('/update/:id', async (req, res)=>{
    try{
        const buyer = await Buyer.findByIdAndUpdate(
            req.params.id,
            { new:true }
        );

        if (!buyer) return res.status(404).json({ message: 'Buyer not found!' });
        
        res.status(200).json(buyer);
        
    } catch(err){
        res.status(400).json({message: err.message});
    }
})

router.delete('/:id', async (req, res)=>{
    try{

        const buyer = await Buyer.findByIdAndDelete(req.params.id)
        if(!buyer) return res.status(404).json({message: 'Buyer not found'});
        res.status(200).json({ message: 'Buyer deleted'});

    } catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router;