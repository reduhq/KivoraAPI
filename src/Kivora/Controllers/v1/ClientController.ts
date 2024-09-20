import IClientService from '@Kivora.AppCore/Interfaces/IClientService'
import settings from '@Kivora.Infraestructure/Settings'
import { inject } from 'inversify'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import ClientDTO from '@Kivora.Domain/DTO/ClientDTO/ClientDTO'
import ValidationMiddleware from '@Kivora/Middlewares/ValidationMiddleware'
import ClientCreateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientCreateDTO'

@controller(`${settings.API_V1_STR}/client`)
export default class ClientController {
    /**
     *  @swagger
     *  tags:
     *      name: Client
     *      description: Clients management
     */
    private readonly clientService: IClientService
    constructor(@inject('IClientService') clientService: IClientService) {
        this.clientService = clientService
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
        // creating the client
        const client = await this.clientService.Create(clientData)
        // response
        const response = plainToInstance(ClientDTO, client, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }
}
