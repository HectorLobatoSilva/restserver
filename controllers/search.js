const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Categorie, Product } = require('./../models')

const whiteListCollections = [
    'users',
    'categories',
    'products'
]

const searchUser = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term)
    let users = null
    if(isMongoId) {
        users = await User.findById(term)   
    }
    const regexp = new RegExp(term, 'i')
    users = await User.find({
        $or: [{name: regexp}, {email: regexp}],
        $and: [{state: true}]
    })

    return res.json({
        results: users ? [users] : []
    })
}

const searchCategories = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term)
    let categories = null
    if(isMongoId) {
        categories = await Categorie.findById(term)   
    }
    const regexp = new RegExp(term, 'i')
    categories = await Categorie.find({
        $or: [{name: regexp}],
        $and: [{state: true}]
    })

    return res.json({
        results: categories ? [categories] : []
    })
}

const searchProducts = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term)
    let products = null
    if(isMongoId) {
        products = await Product.findById(term)   
    }
    const regexp = new RegExp(term, 'i')
    products = await Product.find({
        $or: [{name: regexp}],
        $and: [{state: true}, {enabled: true}]
    })

    return res.json({
        results: products ? [products] : []
    })
}

const search = (req, res = response) => {

    const {collection, term} = req.params

    
    if( !whiteListCollections.includes(collection) ) {
        return res.status(400).json({
            msg: "No collection allowed"
        })
    }
    
    switch(collection){
        case "users": searchUser( term, res )
        break;
        case "categories": searchCategories( term, res)
        break;
        case "products": searchProducts( term, res)
        break;
        default:
            res.status(500).json({
                msg: "Can't find collection"
            })
            break;
    }

}

module.exports = {
    search
}