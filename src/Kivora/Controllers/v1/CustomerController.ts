import ICustomerService from '@Kivora.AppCore/Interfaces/ICustomerService'
import settings from '@Kivora.Infraestructure/Settings'
import { inject } from 'inversify'
import {
    controller,
    httpGet,
    httpPatch,
    httpPost
} from 'inversify-express-utils'
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
import CustomerUpdateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerUpdateDTO'

@controller(`${settings.API_V1_STR}/customer`)
export default class CustomerController {
    /**
     *  @swagger
     *  tags:
     *      name: Customer
     *      description: Customers management
     */
    private readonly customerService: ICustomerService
    private readonly userService: IUserService
    private readonly nodemailerProvider: INodemailerProvider
    constructor(
        @inject('ICustomerService') customerService: ICustomerService,
        @inject('IUserService') userService: IUserService,
        @inject('INodemailerProvider') nodemailerProvider: INodemailerProvider
    ) {
        this.customerService = customerService
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
    @httpGet('/me', JWTMiddleware.GetCurrentCustomer(true))
    public async GetCurrentClient(
        _req: Request,
        res: Response
    ): Promise<Response> {
        const customer: Customer = res.locals.customerModel
        // response
        const response = plainToInstance(CustomerDTO, customer, {
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
        const customers = await this.customerService.GetAll()
        // response
        const response = plainToInstance(CustomerDTO, customers, {
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
        const client = await this.customerService.Create(clientData)
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

    /**
     *  @swagger
     *  /api/v1/customer:
     *      patch:
     *          summary: Update Customer
     *          tags: [Customer]
     *          security:
     *              - oAuth2Password: []
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/CustomerUpdateDTO'
     *          responses:
     *              200:
     *                  description: The customer has been updated succesfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     */
    @httpPatch(
        '/',
        ValidationMiddleware.body(CustomerUpdateDTO),
        JWTMiddleware.GetCurrentCustomer()
    )
    public async Update(req: Request, res: Response): Promise<Response> {
        const currentCustomer = res.locals.userModel
        const updateCustomer = req.body
        // Updating the customer
        const customer = await this.customerService.Update(
            currentCustomer.id,
            updateCustomer
        )
        // validating
        if (!customer)
            return res.status(400).json('Algo salio mal, intente nuevamente...')
        // response
        return res
            .status(200)
            .json({ message: 'El cliente ha sido actualizado correctamente' })
    }
}
