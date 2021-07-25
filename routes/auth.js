const { Router } = require("express");
const { check } = require("express-validator");
const { loginController, googleLogin } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");

const router = Router()

router.post('/login',[
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password have to be more than 9 digits').isLength({min: 9}),
    validateFields
],loginController)

router.post('/google',[
    check('id_token', 'This token is required').not().isEmpty(),
    validateFields
], googleLogin)

module.exports = router