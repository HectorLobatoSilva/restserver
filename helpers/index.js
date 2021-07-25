const dbValidators = require('./dbValidators')
const generateJWT = require('./generateJWT')
const googeVerufy = require('./googeVerufy')
const uploadFile = require('./uploadFile')

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googeVerufy,
    ...uploadFile
}