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

sellerSchema.statics.signup = async function(
                                              firstName,
                                              lastName,
                                              telephoneNumbers,
                                              email,
                                              password
                                            )
{
    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email alredy in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const seller = await this.create({
                                       firstName,
                                       lastName,
                                    //    description,
                                    //    socialMediaLinks,
                                       telephoneNumbers,
                                       email,
                                       password:hash
                                    })
    return seller                                
}

module.exports = mongoose.model('seller',sellerSchema)