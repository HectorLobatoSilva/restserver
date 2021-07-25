const jwt = require('jsonwebtoken')
const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(payload,process.env.SECRET_KEY, {expiresIn: "4h"}, (error, token) => {
            if(error) {
                console.log(error)
                reject('Cant create token')
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJWT
}