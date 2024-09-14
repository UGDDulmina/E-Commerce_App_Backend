const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const sellerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    telephoneNumbers:{
        type: Number
    },
    socialMediaLinks:{
        type: String
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

sellerSchema.statics.signup = async function (firstName,lastName,description,telephoneNumbers,email,password){

    const exists = await this.findOne({email})

    if(!email || !password || !firstName || !lastName || !telephoneNumbers){
        throw Error('All fields must be filled')
    }

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const seller = await this.create({email, password: hash, firstName, lastName,description,telephoneNumbers,})
     
    return seller
    
}

sellerSchema.statics.login = async function(email,password){
    
    const seller = await this.findOne({email})

    if(!email || !password){
        throw Error('All fields must be filled')
    } 
    if(!seller){
        throw Error('Invalied email address!')
    }

    const match = await bcrypt.compare(password, seller.password)

    if(!match){
        throw Error('Invalied password!')
    }

    return seller
}

module.exports = mongoose.model('seller',sellerSchema)