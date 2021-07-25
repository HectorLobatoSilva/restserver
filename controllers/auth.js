const { response } = require("express")
const User = require('./../models/user')
const bcrypt = require('bcryptjs')
const { generateJWT } = require("../helpers/generateJWT")
const { verifyGoogle } = require("../helpers/googeVerufy")

const loginController = async (req, res = response) => {
    const { email, password } = req.body
    try {
        // Validate email
        const user = await User.findOne({ email })
        // user active
        if (!user || !user.state) {
            return res.status(400).send({
                msg: "User or password incorrect",
                code: "2"
            })
        }
        // validate password
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).send({
                msg: "User or password incorrect",
                code: "3"
            })
        }
        // generate jwt
        const token = await generateJWT(user.id)
        res.json({ msg: 'login ok', token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Something goes wrong"
        })
    }
}

const googleLogin = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, email, img } = await verifyGoogle(id_token);
        let user = await User.findOne({email})
        if(!user) {
            const data = {
                name,
                email,
                img,
                password: "asdasd",
                google: true
            }
            user = new User(data)
            await user.save()
        }

        if(!user.state) {
            return res.status(401).json({
                msg: "Unathorized"
            })
        }

        const token = await generateJWT( user.id )

        res.status(200).json({
            msg: "Ok",
            user,
            token,
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            msg: "Google token not recognized"
        })
    }

}

module.exports = {
    loginController,
    googleLogin
}