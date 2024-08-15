import { Request, Response } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { inject } from 'inversify'
import IUserService from '../../../Kivora.AppCore/Interfaces/IUserService'
import ValidationMiddleware from '../../Middlewares/ValidationMiddleware'
import UserCreateDTO from '../../../Kivora.AppCore/DTO/UserDTO/UserCreateDTO'
import UserDTO from '../../../Kivora.AppCore/DTO/UserDTO/UserDTO'
import { plainToInstance } from 'class-transformer'
import settings from '../../Settings'
import { IEmailService } from '../../../Kivora.AppCore/Interfaces/IEmailService'
import ITokenService from '../../../Kivora.AppCore/Interfaces/ITokenService'
import { ConfirmAccountDTO } from '../../../Kivora.AppCore/DTO/UserDTO/ConfirmAccountDTO'

@controller(`${settings.API_V1_STR}/user`)
export default class UserController {
    /**
     *  @swagger
     *  tags:
     *      name: User
     *      description: Gestión de usuarios
     */
    private userService: IUserService
    private emailService: IEmailService
    private tokenService: ITokenService

    constructor(
        @inject('IUserService') userService: IUserService,
        @inject('IEmailService') emailService: IEmailService,
        @inject('ITokenService') tokenService: ITokenService
    ) {
        this.userService = userService
        this.emailService = emailService
        this.tokenService = tokenService
    }

    /**
     *  @swagger
     *  /api/v1/user:
     *      post:
     *          summary: Create a new user
     *          security: []
     *          tags: [User]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/UserCreateDTO'
     *          responses:
     *              200:
     *                  description: User created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/UserDTO'
     */
    @httpPost('/', ValidationMiddleware.body(UserCreateDTO))
    public async create(
        req: Request,
        res: Response
    ): Promise<Response<UserDTO>> {
        const user: UserCreateDTO = req.body
        // Validating if the username and email are available
        const userDB = await this.userService.GetByUsername(user.username)
        const emailDB = await this.userService.GetByEmail(user.email)

        if (user.password !== user.passwordConfirmation) {
            return res.status(400).json('Las contraseñas son diferentes')
        }
        if (userDB) {
            return res.status(409).json('El username ya esta en uso')
        }
        if (emailDB) {
            return res.status(409).json({ message: 'El email ya esta en uso' })
        }

        // Creating a new User
        const newUser = await this.userService.Create(user)

        const token = await this.tokenService.GenerateToken(newUser.id)

        // Confirmation Email
        await this.emailService.sendConfirmationEmail({
            email: newUser.email,
            name: newUser.username,
            token: token.token
        })

        // Returning the UserDTO
        const response = plainToInstance(UserDTO, newUser, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/user/confirm-account:
     *      post:
     *          summary: Confirm user account
     *          tags: [User]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ConfirmAccountDTO'
     *          responses:
     *              200:
     *                  description: Account confirmed successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     */

    @httpPost('/confirm-account', ValidationMiddleware.body(ConfirmAccountDTO))
    public async confirm_account(
        req: Request,
        res: Response
    ): Promise<Response> {
        const token: ConfirmAccountDTO = req.body

        // Obtener el token de la base de datos
        const tokenEntity = await this.tokenService.ValidateToken(token.token)
        if (!tokenEntity) {
            return res.status(400).json({ message: 'Token Inválido' })
        }

        const user = await this.userService.GetUserByToken(token.token)
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        const updateUserDTO = {
            id: user.id,
            confirmed: true
        }
        await this.userService.Update(updateUserDTO)

        await this.tokenService.InvalidateToken(token.token)

        return res
            .status(200)
            .json({ message: 'Account confirmed successfully' })
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
}
