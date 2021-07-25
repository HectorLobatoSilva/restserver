const { response } = require('express')
const { Product } = require('./../models')

const getAllProducts = async (req, res = response) => {
    const { from = 0, to = 5 } = req.query
    const [total, [products]] = await Promise.all([
        Product.countDocuments({ state: true }),
        Product.find({ state: true }).skip(Number(from)).limit(Number(to)).populate('user', 'name').populate('category', 'name'),
    ])

    res.status(200).json({
        total,
        products
    })
}

const getProductsById = async (req, res = response) => {
    const id = req.params.id

    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name')

    res.status(200).json({
        product
    })
}

const addNewProduct = async (req, res = response) => {

    const {name, category} = req.body

    const data = {
        name: name.toUpperCase(),
        user: req.authUser._id,
        category
    }

    const product = new Product(data)
    await product.save()

    res.status(201).json({
        msg: "Product created",
        product
    })
}

const updateProduct = async (req, res = response) => {
    const id = req.params.id

    const { state, user, ...data } = req.body
    data.name = data.name.toUpperCase()
    data.user = req.authUser

    const product = await Product.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({
        msg: "Product updated",
        product
    })
}

const deleteProduct = async (req, res = response) => {
    const id = req.params.id
    
    const product = await Product.findByIdAndUpdate(id, { state: false })
    
    res.status(200).json({
        msg: "Product deleted",
        product
    })
}

module.exports = {
    getAllProducts,
    getProductsById,
    addNewProduct,
    updateProduct,
    deleteProduct
}