const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('./../models/user')

const getPath = async (req, res = response) => {
    // Get query params
    const { from = 0, to = 5 } = req.query
    const [total, users] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true }).skip(Number(from)).limit(Number(to)),
    ])
    res.json({ total, users })
}

const postPath = async (req, res = response) => {
    // Get body
    const { name, email, password, rol } = req.body
    const user = new User({ name, email, password, rol });
    // Encriptar contrasena
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)
    // Guardar en db
    await user.save()
    res.json({ msg: "Message", user })
}

const putPath = async (req, res = response) => {
    // Get params
    const id = req.params.id
    const { _id, password, google, email, ...resto } = req.body
    if (password) {
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt)
    }
    const user = await User.findOneAndUpdate(id, resto)
    res.json({ msg: "Message", user })
}

const deletePath = async (req, res = response) => {
    const id = req.params.id
    // const user = await User.findByIdAndDelete(id)
    const user = await User.findByIdAndUpdate(id, { state: false })
    const authUser = req.authUser
    res.json({ msg: "User deleted", user, by: authUser })
}

const patchPath = (req, res = response) => {
    res.json({ msg: "Message" })
}

module.exports = {
    getPath,
    postPath,
    putPath,
    deletePath,
    patchPath
}