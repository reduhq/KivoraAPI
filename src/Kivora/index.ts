import 'reflect-metadata'
import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './inversify.config'
import swaggerDocs from './swagger'
import settings from './Settings'

const server = new InversifyExpressServer(container)
const PORT = process.env.PORT

server.setConfig((app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    swaggerDocs(app)
})

import './Controllers/v1/UserController'
import './Controllers/v1/LoginController'
import './Controllers/v1/BusinessmanController'

const app = server.build()

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${settings.SERVER_HOST}/api`)
})
