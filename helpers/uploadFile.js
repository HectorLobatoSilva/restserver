const { v4: uuid } = require('uuid')
const path = require('path')

const uploadFile = ( files, extenciosEnabled = [ 'jpg', 'jpeg', 'png', 'svg' ], folder = '', name = uuid() ) => {

    return new Promise( ( resolve, reject ) => {
        const { file }  = files
        const splitedName = file.name.split('.')
        const extencion = splitedName[splitedName.length - 1]

        if ( !extenciosEnabled.includes(extencion) ) {
            reject( 'No extention available' )
        }

        const temporalName = `${name}.${extencion}`
        const uploadPath = path.join( __dirname, '../uploads/', folder , temporalName )
        file.mv(uploadPath, (err) => {
            if(err) {
                console.log("uploadFile", err)
                reject(err)
            }

            resolve( temporalName )
        })
    } )
}
module.exports = {
    uploadFile
}