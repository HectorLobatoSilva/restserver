const { response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async (req, res = response, next) => {
    const token = req.header('x-token')
    if(!token) {
        return res.status(400).json({
            msg: "Token missing"
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY)
        const authUser = await User.findById(uid)
        if(!authUser.state) {
            return res.status(400).json({
                msg: "Not user"
            })
        }
        if(!authUser.state) {
            return res.status(400).json({
                msg: "Token missing"
            })
        }
        req.authUser = authUser
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({
            msg: "Not a valid token"
        })
    }
}

module.exports = {
    validateJWT
}