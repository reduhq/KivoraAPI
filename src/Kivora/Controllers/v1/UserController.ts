import { Request, Response } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { inject } from 'inversify'
import IUserService from '../../../Kivora.AppCore/Interfaces/IUserService'
import ValidationMiddleware from '../../Middlewares/ValidationMiddleware'
import UserDTO from '../../../Kivora.Domain/DTO/UserDTO/UserDTO'
import { plainToInstance } from 'class-transformer'
import settings from '../../../Kivora.Infraestructure/Settings'
import { query } from 'express-validator'
import JWT from '@Kivora.Infraestructure/libs/JWT'
import User from '@Kivora.Domain/Entities/User'
import IEmailSenderProvider from '@Kivora.Domain/Interfaces/Providers/IEmailSenderProvider'

@controller(`${settings.API_V1_STR}/user`)
export default class UserController {
    /**
     *  @swagger
     *  tags:
     *      name: User
     *      description: Gestión de usuarios
     */
    private userService: IUserService
    private emailSenderProvider: IEmailSenderProvider
    // private tokenService: ITokenService

    constructor(
        @inject('IUserService') userService: IUserService,
        @inject('IEmailSenderProvider')
        emailSenderProvider: IEmailSenderProvider
    ) {
        this.userService = userService
        this.emailSenderProvider = emailSenderProvider
    }

    /**
     *  @swagger
     *  /api/v1/user:
     *      get:
     *          summary: Get all registered users
     *          security: []
     *          tags: [User]
     *          responses:
     *              200:
     *                  description: List of users
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#/components/schemas/UserDTO'
     */
    @httpGet('/')
    public async getAll(_req: Request, res: Response) {
        // Getting all the Users
        const users = await this.userService.GetAll()

        // Returning a list of UserDTO
        const response = plainToInstance(UserDTO, users, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/user/activate-user:
     *      post:
     *          summary: Activate a user
     *          tags: [User]
     *          parameters:
     *              -   in: query
     *                  name: token
     *                  required: true
     *                  schema:
     *                      type: string
     *          responses:
     *              200:
     *                  description: The user has been activated successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     */
    @httpPost(
        '/activate-user',
        query('token')
            .exists()
            .withMessage('El campo token es requerido')
            .notEmpty()
            .withMessage('El token no puede estar vacio')
            .isString()
            .withMessage('El token deberia de ser un string'),
        ValidationMiddleware.validate()
    )
    public async ActivateUser(req: Request, res: Response): Promise<Response> {
        const { token } = req.query
        const userId = JWT.VerifyToken(token as string)
        if (!userId) {
            return res.status(403).json('Token inválido')
        }
        // Validating the user
        const user: User = await this.userService.GetById(userId)
        if (!user) {
            return res.status(404).json('usuario no encontrado')
        }
        if (user.confirmed) {
            return res
                .status(403)
                .json(
                    'La cuenta de este usuario ya ha sido activada anteriormente'
                )
        }
        // Activating the user account
        const activatedUser: User = await this.userService.ActivateUser(userId)
        // Sending a welcome email
        await this.emailSenderProvider.SendWelcomeEmail(
            activatedUser.email,
            activatedUser.username
        )
        // Returning the response
        return res.json({ msg: 'El usuario ha sido activado exitosamente' })
    }
}
