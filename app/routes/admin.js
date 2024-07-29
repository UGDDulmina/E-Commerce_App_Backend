const express = require('express');
const Admin = require('../models/schema/admin');
const { plainToClass } = require('class-transformer');
const { validate } = require('class-validator');
const {AdminRequestDto} = require('../models/dto/request/admin');
const {AdminResponseDto} = require('../models/dto/response/admin')
const router = express.Router();



router.post('/create',async (req, res)=> {

    const adminRequestDto = plainToClass(AdminRequestDto, req.body);

    const errors = await validate(adminRequestDto);
    if(errors.lenght > 0){
        return res.status(400).json({ errors });
    }

    try {
        const newAdmin = new Admin(adminRequestDto);
        await newAdmin.save();

        const adminResponseDto= plainToClass(AdminResponseDto, newAdmin.toObject());
        res.status(201).json(adminResponseDto);
    } catch (err){
        res.status(400).json({message: err.message})
    }
    
})

router.get('/', async (req , res) =>{
    try {
        const admin = await Admin.find();
        const adminResponse = admin.map(admin => 
            plainToClass(AdminResponseDto, admin.toObject())
        );
        res.status(200).json(adminResponse)
    } catch(err){
        res.status(400).json({message:err.message})
    }

})

router.get('/:id', async (req , res)=>{

    try {
        const adminRequestDto = plainToClass(AdminRequestDto, req.body);
        const admin = await Admin.findById(req.params.id,adminRequestDto);
        if (!admin) return res.status(404).json({ message: 'Admin not found!' });
        
        const adminResponse =   plainToClass(AdminResponseDto, admin.toObject())
        res.status(200).json(adminResponse);


    } catch (err){
        res.status(500).json({ message: err.message });
    }
})

router.put('/update/:id', async (req, res)=>{
    try{
        const adminRequestDto = plainToClass(AdminRequestDto, req.body);

        const errors = await validate(adminRequestDto);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            adminRequestDto,
            { new:true }
        );

        if (!admin) return res.status(404).json({ message: 'Admin not found!' });
        
        const adminResponse =   plainToClass(AdminResponseDto, admin.toObject())
        res.status(200).json(adminResponse);

        
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