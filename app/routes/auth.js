const express = require('express');
const Buyer = require('../models/buyer');
const Seller = require('../models/seller');
const jwt = require('jsonwebtoken');
const router = express.Router();
 
const generateToken = (_id) => {

    return jwt.sign({_id}, process.env.SECRET,{expiresIn: '3d'})
}


router.post('/login', async (req, res)=>{

    try {
        const {email,password} = req.body;

        const buyer = await Buyer.login(email,password);
        const seller = await Seller.login(email,password);
        
        const token = generateToken(buyer._id || seller._id)
        res.status(201).json({message:'Login successfull!', token});
    } catch (err){
        res.status(400).json({message: err.message})
    }

})

module.exports = router;





