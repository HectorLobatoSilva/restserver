require('dotenv')
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads'
        }
        // Conectar base de datos
        this.conectarDB()
        // Middeware
        this.middlewares()
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors())
        // Lectura y parseo
        this.app.use(express.json())
        // Directorio publico
        this.app.use(express.static('public'))
        // Middleware to upload files
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: "/tmp/",
            createParentPath: true
        }))
    }

    routes(){
        this.app.use(this.paths.users, require('./../routes/user'))
        this.app.use(this.paths.auth, require('./../routes/auth'))
        this.app.use(this.paths.categories, require('./../routes/categories'))
        this.app.use(this.paths.products, require('./../routes/products'))
        this.app.use(this.paths.search, require('./../routes/search'))
        this.app.use(this.paths.uploads, require('./../routes/uploads'))
    }

    start() {
        this.app.listen( this.port, () => {
            console.log("Server start in port "+ this.port)
        })
    }
}

module.exports = Server