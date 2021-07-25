const { Router } = require('express')
const { check } = require('express-validator')
const { getAllCategories, getCategoriesById, updateCategorie, addNewCategorie, deleteCategorie } = require('../controllers/categories')
const { isCategoryExist } = require('../helpers/dbValidators')

const {
    validateFields, validateJWT, isAdminRol,
} = require('./../middlewares')

const router = Router()

router.get('/', getAllCategories)

router.get('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(isCategoryExist),
    validateFields,
], getCategoriesById)

router.post('/',[
    validateJWT,
    check('name', 'Name of categorie is required').notEmpty(),
    validateFields
], addNewCategorie)

router.put('/:id', [
    validateJWT,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(isCategoryExist),
    check('name', 'Name is required').notEmpty(),
    validateFields
], updateCategorie)

router.delete('/:id', [
    validateJWT,
    isAdminRol,
    check('id').custom(isCategoryExist),
    check('id', 'This is not a valid ID').isMongoId(),
    validateFields
], deleteCategorie)

module.exports = router