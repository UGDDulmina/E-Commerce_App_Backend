const express = require('express');
const Buyer = require('../models/buyer');
const router = express.Router();
const jwt = require('jsonwebtoken');

const generateToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
} 



router.post('/signup',async (req, res)=> {

    try {
        const { firstName, lastName, email, password } = req.body;
        const newBuyer = await Buyer.signup(firstName,lastName,email,password);
        
        const token = generateToken(newBuyer._id)
        res.status(201).json({message:'Signup successfull!', token});
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
            req.body,
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