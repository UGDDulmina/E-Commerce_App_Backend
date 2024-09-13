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

buyerSchema.statics.signup = async function (email, password,firstName,lastName){

    const exists = await this.findOne({email})

    if(!email || !password || !firstName || !lastName){
        throw Error('All fields must be filled')
    }

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const buyer = await this.create({email, password: hash, firstName, lastName})
     
    return buyer
    
}

module.exports = mongoose.model('buyer',buyerSchema)