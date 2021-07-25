const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFiles, updateImage, showImage } = require("../controllers/uploads");
const { validateFields } = require("../middlewares/validateFields");
const { collectionsEnabled } = require('../helpers')

const router = Router()

router.post('/', uploadFiles)

router.put('/:collection/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('collection').custom( c => collectionsEnabled(c , ['users','products']) ),
    validateFields
], updateImage)

router.get('/:collection/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('collection').custom( c => collectionsEnabled(c , ['users','products']) ),
    validateFields
], showImage)

module.exports = router