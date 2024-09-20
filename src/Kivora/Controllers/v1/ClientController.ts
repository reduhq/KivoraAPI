import IClientService from '@Kivora.AppCore/Interfaces/IClientService'
import settings from '@Kivora.Infraestructure/Settings'
import { inject } from 'inversify'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import ClientDTO from '@Kivora.Domain/DTO/ClientDTO/ClientDTO'
import ValidationMiddleware from '@Kivora/Middlewares/ValidationMiddleware'
import ClientCreateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientCreateDTO'
import INodemailerProvider from '@Kivora.Domain/Interfaces/Providers/INodemailerProvider'
import JWT from '@Kivora.Infraestructure/libs/JWT'
import IUserService from '@Kivora.AppCore/Interfaces/IUserService'
import JWTMiddleware from '@Kivora/Middlewares/JWTMiddleware'
import Client from '@Kivora.Domain/Entities/Client'

@controller(`${settings.API_V1_STR}/client`)
export default class ClientController {
    /**
     *  @swagger
     *  tags:
     *      name: Client
     *      description: Clients management
     */
    private readonly clientService: IClientService
    private readonly userService: IUserService
    private readonly nodemailerProvider: INodemailerProvider
    constructor(
        @inject('IClientService') clientService: IClientService,
        @inject('IUserService') userService: IUserService,
        @inject('INodemailerProvider') nodemailerProvider: INodemailerProvider
    ) {
        this.clientService = clientService
        this.nodemailerProvider = nodemailerProvider
        this.userService = userService
    }

    /**
     *  @swagger
     *  /api/v1/client/me:
     *      get:
     *          summary: Get Current Client
     *          tags: [Client]
     *          security:
     *              - oAuth2Password: []
     *          responses:
     *              200:
     *                  description: Get Current Client
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/ClientDTO'
     */
    @httpGet('/me', JWTMiddleware.GetCurrentClient(true))
    public async GetCurrentClient(
        _req: Request,
        res: Response
    ): Promise<Response> {
        const client: Client = res.locals.clientModel
        // response
        const response = plainToInstance(ClientDTO, client, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/client:
     *      get:
     *          summary: Get all clients
     *          tags: [Client]
     *          responses:
     *              200:
     *                  description: All clients
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/ClientDTO'
     */
    @httpGet('/')
    public async GetAll(_req: Request, res: Response): Promise<Response> {
        const clients = await this.clientService.GetAll()
        // response
        const response = plainToInstance(ClientDTO, clients, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/client:
     *      post:
     *          summary: Create a new client
     *          tags: [Client]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ClientCreateDTO'
     *          responses:
     *              200:
     *                  description: Client created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/ClientDTO'
     */
    @httpPost('/', ValidationMiddleware.body(ClientCreateDTO))
    public async Create(req: Request, res: Response): Promise<Response> {
        const clientData: ClientCreateDTO = req.body
        // validating
        const userUsername = await this.userService.GetByUsername(
            clientData.user.username
        )
        const userEmail = await this.userService.GetByEmail(
            clientData.user.email
        )
        if (userUsername) {
            return res.status(400).json('El username ya esta en uso')
        }
        if (userEmail) {
            return res.status(400).json('El email ya esta en uso')
        }
        // creating the client
        const client = await this.clientService.Create(clientData)
        // Create token
        const token = JWT.GenerateNewAccountToken(client.id)
        // Sending the confirmation email
        if (settings.EMAILS_ENABLED && clientData.user.email) {
            await this.nodemailerProvider.SendNewAccountEmail(
                clientData.user.email,
                clientData.user.username,
                token
            )
        }
        // response
        const response = plainToInstance(ClientDTO, client, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }
}
