const { response } = require("express")

const isAdminRol = (req, res = response, next) => {
    if(!req.authUser) {
        return res.status(500).json({
            msg:"Server error"
        })
    }
    const {rol, name} = req.authUser
    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not admin`
        })
    }
    next()
}

const haveRol = ( ...rols ) => {
    return (req, res = response, next) => {
        if(!req.authUser) {
            return res.status(500).json({
                msg:"Server error"
            })
        }
        if ( !rols.includes(req.authUser.rol) ){
            return res.status(401).json({
                msg:`Server needs one of this roles ${rols}`
            })
        }
        next()
    }
}

module.exports = {
    isAdminRol,
    haveRol
}