const { response } = require("express");
const { User, Product } = require("../models");
const path = require('path')
const fs = require('fs')

const { uploadFile } = require('./../helpers');
const { fsyncSync } = require("fs");

const  uploadFiles = async (req, res = response) => {

    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        res.status(400).send('No file was uploaded')
    }

    try {
        const fileName = await uploadFile( req.files, [ 'txt', 'ods' ], 'db' )
        res.json({fileName})
    }catch(err) {
        res.status(500).json({err})
    }

}

const updateImage = async ( req, res= response ) => {
    try {
        const { collection, id } = req.params
        let model

        switch( collection ) {
            case 'users': 
                model = await User.findById( id )
                if(!model){
                    return res.status(400).json({msg: "No user exists"})
                }
            break;

            case 'product': 
                model = await Product.findById( id )
                    if(!model){
                        return res.status(400).json({msg: "No product exists"})
                    }
            break;
            default: res.status(500).json({msg: "Not implemented"})
        }

        const fileName = await uploadFile( req.files, undefined, collection, model._id )
        model.img = fileName
        await model.save()
        res.json({model})
    }catch(err) {
        res.status(500).json({err: "No file selected"})
    }
}

const showImage = async ( req, res = response ) => {
    try {
        const { collection, id } = req.params
        let model

        switch( collection ) {
            case 'users': 
                model = await User.findById( id )
                if(!model){
                    return res.status(400).json({msg: "No user exists"})
                }
            break;

            case 'product': 
                model = await Product.findById( id )
                    if(!model){
                        return res.status(400).json({msg: "No product exists"})
                    }
            break;
            default: res.status(500).json({msg: "Not implemented"})
        }
        const noImage = path.join( __dirname, '../uploads/','no-image.jpg' )

        if( model.img ) {
            const pathImage = path.join( __dirname, '../uploads/', collection , model.img )
            if( fs.existsSync(pathImage) ) {
                return res.sendFile(pathImage)
            }
        }

        return res.sendFile( noImage )
    }catch(err) {
        res.status(500).json({err: "No file selected"})
    }
}

module.exports = {
    uploadFiles,
    updateImage,
    showImage
}