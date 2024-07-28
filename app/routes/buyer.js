const express = require('express');
const Buyer = require('../models/schema/buyer');
const { plainToClass } = require('class-transformer');
const { validate } = require('class-validator');
const {BuyerRequestDto} = require('../models/dto/request/buyer');
const {BuyerResponseDto} = require('../models/dto/response/buyer')
const router = express.Router();



router.post('/create',async (req, res)=> {

    const buyerRequestDto = plainToClass(BuyerRequestDto, req.body);

    const errors = await validate(buyerRequestDto);
    if(errors.lenght > 0){
        return res.status(400).json({ errors });
    }

    try {
        const newBuyer = new Buyer(buyerRequestDto);
        await newBuyer.save();

        const buyerResponseDto= plainToClass(BuyerResponseDto, newBuyer.toObject());
        res.status(201).json(buyerResponseDto);
    } catch (err){
        res.status(400).json({message: err.message})
    }
    
})

router.get('/', async (res) =>{
    try {
        const buyer = await Buyer.find();
        const buyerResponse = buyer.map(buyer => 
            plainToClass(BuyerResponseDto, buyer.toObject())
        );
        res.status(200).json(buyerResponse)
    } catch(err){
        res.status(500).json({message:err.message})
    }

})

router.get('/:id', async (req,res)=>{

    try {
        const buyer = await Buyer.findById(req.params.id);
        const buyerResponse = buyer.map(buyer =>
            plainToClass(BuyerResponseDto, buyer.toObject())
        )
        if(!buyerResponse) return res.status(400).json({message: 'Buyer not found!'})
        res.status(200).json(buyerResponse);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const buyerRequestDto = plainToClass(BuyerRequestDto, req.body);

        const errors = await validate(buyerRequestDto);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const buyer = await Buyer.findByIdAndUpdate(
            req.params.id,
            buyerRequestDto,
            { new:true }
        );

        if (!buyer) return res.status(404).json({ message: 'Buyer not found!' });
        
        const buyerResponse =   plainToClass(BuyerResponseDto, buyer.toObject())
        res.status(200).json(buyerResponse);

        
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