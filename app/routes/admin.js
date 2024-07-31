const express = require('express');
const Admin = require('../models/admin');
const router = express.Router();



router.post('/create',async (req, res)=> {

    try {
        const { firstName, lastName, email, password } = req.body;

        const newAdmin = new Admin({ firstName, lastName, email, password });
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (err){
        res.status(400).json({message: err.message})
    }
    
})

router.get('/', async (req , res) =>{
    try {
        const admin = await Admin.find();
        res.status(200).json(admin)
    } catch(err){
        res.status(400).json({message:err.message})
    }

})

router.get('/:id', async (req , res)=>{

    try {
        const admin = await Admin.findById(req.params.id );
        if (!admin) return res.status(404).json({ message: 'Admin not found!' });
        
         
        res.status(200).json(admin);


    } catch (err){
        res.status(500).json({ message: err.message });
    }
})

router.put('/update/:id', async (req, res)=>{
    try{
        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            { new:true }
        );

        if (!admin) return res.status(404).json({ message: 'Admin not found!' });
        
        res.status(200).json(admin);
        
    } catch(err){
        res.status(400).json({message: err.message});
    }
})

router.delete('/:id', async (req, res)=>{
    try{

        const admin = await Admin.findByIdAndDelete(req.params.id)
        if(!admin) return res.status(404).json({message: 'Admin not found'});
        res.status(200).json({ message: 'Admin deleted'});

    } catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router;