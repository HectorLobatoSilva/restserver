const validateFields= require('../middlewares/validateFields')
const validateJWT = require('../middlewares/validateJWT')
const validateRol = require('../middlewares/validateRol')

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRol
}