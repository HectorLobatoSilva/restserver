const { Router } = require('express')
const { check } = require('express-validator')
const { getAllProducts, getProductsById, addNewProduct, updateProduct, deleteProduct } = require('../controllers/products')
const { isProductExist } = require('../helpers/dbValidators')
const { validateFields, isAdminRol, validateJWT } = require('../middlewares')

const router = Router()

router.get('/', getAllProducts)

router.get('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(isProductExist),
    validateFields
], getProductsById)

router.post('/',[
    validateJWT,
    check('name', 'Name of product is required').notEmpty(),
    check('price', 'Price have to be number').isNumeric().optional(),
    check('category', 'Category of product is required').notEmpty(),
    check('category', 'Category is not valid').isMongoId(),
    validateFields
], addNewProduct)

router.put('/:id', [
    validateJWT,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(isProductExist),
    check('name', 'Name is required').notEmpty(),
    check('price', 'Price have to be number').isNumeric().optional(),
    check('category', 'Category of product is required').notEmpty(),
    check('category', 'Category is not valid').isMongoId(),
    validateFields
], updateProduct)

router.delete('/:id', [
    validateJWT,
    isAdminRol,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(isProductExist),
    validateFields
], deleteProduct)

module.exports = router