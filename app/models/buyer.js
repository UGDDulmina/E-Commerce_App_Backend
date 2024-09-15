const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const buyerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    }
},{timestamps: true})

buyerSchema.statics.signup = async function (firstName,lastName,email, password){

    

    if(!email || !password || !firstName || !lastName){
        throw Error('All fields must be filled')
    }
    
    const existBuyer = await this.findOne({email});
    const existSeller = await mongoose.model('seller').findOne({ email });

    if (existBuyer) {
        throw Error('Email already in use');
    }
    if (existSeller) {
        throw Error('This Email already used for signup as seller!');
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const buyer = await this.create({email, password: hash, firstName, lastName})
     
    return buyer
    
}
buyerSchema.statics.login = async function(email,password){
    
    const buyer = await this.findOne({email})

    if(!email || !password){
        throw Error('All fields must be filled')
    } 
    if(!buyer){
        throw Error('Invalied email address!')
    }

    const match = await bcrypt.compare(password, buyer.password)

    if(!match){
        throw Error('Invalied password!')
    }

    return buyer
}

module.exports = mongoose.model('buyer',buyerSchema)