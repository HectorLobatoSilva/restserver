const { response } = require('express')
const { Categorie } = require('./../models')

const getAllCategories = async (req, res = response) => {

    const { from = 0, to = 5 } = req.query
    const [total, categories] = await Promise.all([
        Categorie.countDocuments({ state: true }),
        Categorie.find({ state: true }).skip(Number(from)).limit(Number(to)).populate('user', 'name'),
    ])

    res.status(200).json({
        total,
        categories
    })
}

const getCategoriesById = async (req, res = response) => {
    const id = req.params.id

    const category = await Categorie.findById(id).populate('user', 'name')

    res.status(200).json({
        category
    })
}

const addNewCategorie = async (req, res = response) => {

    const name = req.body.name.toUpperCase()
    const categorieDB = await Categorie.findOne({ name })

    if (categorieDB) {
        return res.status(400).json({
            msg: "Categorie already exist"
        })
    }

    const data = {
        name,
        user: req.authUser._id
    }

    const categorie = new Categorie(data)
    await categorie.save()

    res.status(201).json({
        msg: "Categorie created",
        categorie
    })
}
const updateCategorie = async (req, res = response) => {
    const id = req.params.id

    const { state, user, ...data } = req.body
    data.name = data.name.toUpperCase()
    data.user = req.authUser

    const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({
        msg: "Category updated",
        categorie
    })
}

const deleteCategorie = async (req, res = response) => {
    const id = req.params.id
    
    const categorie = await Categorie.findByIdAndUpdate(id, { state: false })
    
    res.status(200).json({
        msg: "Category deleted",
        categorie
    })
}

module.exports = {
    getAllCategories,
    getCategoriesById,
    addNewCategorie,
    updateCategorie,
    deleteCategorie
}