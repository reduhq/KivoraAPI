import ICustomerService from '@Kivora.AppCore/Interfaces/ICustomerService'
import settings from '@Kivora.Infraestructure/Settings'
import { inject } from 'inversify'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import CustomerDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerDTO'
import ValidationMiddleware from '@Kivora/Middlewares/ValidationMiddleware'
import CustomerCreateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerCreateDTO'
import INodemailerProvider from '@Kivora.Domain/Interfaces/Providers/INodemailerProvider'
import JWT from '@Kivora.Infraestructure/libs/JWT'
import IUserService from '@Kivora.AppCore/Interfaces/IUserService'
import JWTMiddleware from '@Kivora/Middlewares/JWTMiddleware'
import Customer from '@Kivora.Domain/Entities/Customer'

@controller(`${settings.API_V1_STR}/customer`)
export default class CustomerController {
    /**
     *  @swagger
     *  tags:
     *      name: Customer
     *      description: Clients management
     */
    private readonly clientService: ICustomerService
    private readonly userService: IUserService
    private readonly nodemailerProvider: INodemailerProvider
    constructor(
        @inject('ICustomerService') clientService: ICustomerService,
        @inject('IUserService') userService: IUserService,
        @inject('INodemailerProvider') nodemailerProvider: INodemailerProvider
    ) {
        this.clientService = clientService
        this.nodemailerProvider = nodemailerProvider
        this.userService = userService
    }

    /**
     *  @swagger
     *  /api/v1/customer/me:
     *      get:
     *          summary: Get Current customer
     *          tags: [Customer]
     *          security:
     *              - oAuth2Password: []
     *          responses:
     *              200:
     *                  description: Get Current customer
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/CustomerDTO'
     */
    @httpGet('/me', JWTMiddleware.GetCurrentClient(true))
    public async GetCurrentClient(
        _req: Request,
        res: Response
    ): Promise<Response> {
        const client: Customer = res.locals.clientModel
        // response
        const response = plainToInstance(CustomerDTO, client, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/customer:
     *      get:
     *          summary: Get all customer
     *          tags: [Customer]
     *          responses:
     *              200:
     *                  description: All customers
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/CustomerDTO'
     */
    @httpGet('/')
    public async GetAll(_req: Request, res: Response): Promise<Response> {
        const clients = await this.clientService.GetAll()
        // response
        const response = plainToInstance(CustomerDTO, clients, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/customer:
     *      post:
     *          summary: Create a new customer
     *          tags: [Customer]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/CustomerCreateDTO'
     *          responses:
     *              200:
     *                  description: Customer created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/CustomerDTO'
     */
    @httpPost('/', ValidationMiddleware.body(CustomerCreateDTO))
    public async Create(req: Request, res: Response): Promise<Response> {
        const clientData: CustomerCreateDTO = req.body
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
        const response = plainToInstance(CustomerDTO, client, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }
}
