const { Role, User, Categorie, Product } = require('./../models/')

const isRolValidatte = async ( rol = '' ) => {
    const rolExist = await Role.findOne({rol})
    if(!rolExist) {
        throw new Error(`This ${rol} rol does not exist on database`)
    }
} 

const isEmailExist = async ( email = '' ) => {
    const emailExist = await User.findOne({email})
    if(emailExist){
        console.log("existe",emailExist)
        throw new Error(`This ${email} already exists`)
    }
}

const isUserExists = async ( id = '' ) => {
    const userExist = await User.findById(id)
    if(!userExist){
        throw new Error(`This user ${id} not exists`)
    }
}

const isCategoryExist = async ( id = '' ) => {
    const categoryExists = await Categorie.findById(id)
    if(!categoryExists){
        throw new Error(`This category ${id} not exists`)
    }
}

const isProductExist = async ( id = '' ) => {
    const productExists = await Product.findById(id)
    if(!productExists){
        throw new Error(`This product ${id} not exists`)
    }
}

const collectionsEnabled = ( collection = '', collections = [] ) => {
    if( !collections.includes(collection) ) {
        throw new Error("No collection enabled")
    }
    return true
}

module.exports = {
    isRolValidatte,
    isEmailExist,
    isUserExists,
    isCategoryExist,
    isProductExist,
    collectionsEnabled
}