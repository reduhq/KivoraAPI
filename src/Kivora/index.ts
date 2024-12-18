import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './inversify.config'
import swaggerDocs from './swagger'
import settings from '../Kivora.Infraestructure/Settings'

const server = new InversifyExpressServer(container)
const PORT = process.env.PORT

server.setConfig((app) => {
    //CORS
    app.use(
        cors({
            origin: '*',
            credentials: true
            // methods: '*',
            // allowedHeaders: '*'
        })
    )
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    swaggerDocs(app)
})

// Configuring cloudinary
cloudinary.config({
    api_key: settings.CLOUDINARY_API_KEY,
    api_secret: settings.CLOUDINARY_API_SECRET,
    cloud_name: settings.CLOUDINARY_CLOUD_NAME
})

import './Controllers/v1/UserController'
import './Controllers/v1/LoginController'
import './Controllers/v1/BusinessmanController'
import './Controllers/v1/ProductController'
import './Controllers/v1/BusinessController'
import './Controllers/v1/CustomerController'
import './Controllers/v1/SearchController'

const app = server.build()

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${settings.SERVER_HOST}/api`)
})
