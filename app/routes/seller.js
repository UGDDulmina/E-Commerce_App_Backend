const express = require('express');
const Seller = require('../models/seller');
const router = express.Router();



router.post('/create',async (req, res)=> {

    try {
        const 
        { 
         firstName,
         lastName, 
         email, 
         password,
         description,
         telephoneNumbers,
         socialMediaLinks,

        } = req.body;

        const newSeller = new Seller
        ({ 
            firstName,
            lastName,
            email,
            password,
            description,
            telephoneNumbers,
            socialMediaLinks 
        });
        await newSeller.save();
        res.status(201).json(newSeller);
    } catch (err){
        res.status(400).json({message: err.message})
    }
    
})

router.get('/', async (req , res) =>{
    try {
        const seller = await Seller.find();
        res.status(200).json(seller)
    } catch(err){
        res.status(400).json({message:err.message})
    }

})

router.get('/:id', async (req , res)=>{

    try {
        const seller = await Seller.findById(req.params.id );
        if (!seller) return res.status(404).json({ message: 'Seller not found!' });
        
         
        res.status(200).json(seller);


    } catch (err){
        res.status(500).json({ message: err.message });
    }
})

router.put('/update/:id', async (req, res)=>{
    try{
        const seller = await Seller.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );

        if (!seller) return res.status(404).json({ message: 'Seller not found!' });
        
        res.status(200).json(seller);
        
    } catch(err){
        res.status(400).json({message: err.message});
    }
})

router.delete('/:id', async (req, res)=>{
    try{

        const seller = await Seller.findByIdAndDelete(req.params.id)
        if(!seller) return res.status(404).json({message: 'Seller not found'});
        res.status(200).json({ message: 'Seller deleted'});

    } catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router;