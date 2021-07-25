const { Router } = require('express')
const { check } = require('express-validator')

const { getPath, postPath, putPath, deletePath, patchPath } = require('../controllers/user')
const { isRolValidatte, isEmailExist, isUserExists } = require('../helpers/dbValidators')

const {
    validateFields,
    validateJWT,
    isAdminRol,
    haveRol
} = require('./../middlewares')

const router = Router()

router.get('/', getPath)

router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('password', 'The password have to be more than 9 characters').isLength({ min: 9 }),
    check('email', 'This is not a email').isEmail(),
    check('email').custom(isEmailExist),
    check('rol').custom(isRolValidatte),
    // check('rol','This is not a valid role').isIn(['ADMIN_ROLE','USER_ROLE']),
    validateFields
], postPath)


router.put('/:id', [
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(isUserExists),
    check('rol').custom(isRolValidatte),
    validateFields
], putPath)

router.delete('/:id', [
    validateJWT,
    // isAdminRol,
    haveRol,
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(isUserExists),
    validateFields
], deletePath)

router.patch('/', patchPath)

module.exports = router