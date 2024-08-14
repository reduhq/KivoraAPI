import { Request, Response } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { inject } from 'inversify'
import IUserService from '../../../Kivora.AppCore/Interfaces/IUserService'
import ValidationMiddleware from '../../Middlewares/ValidationMiddleware'
import UserCreateDTO from '../../../Kivora.AppCore/DTO/UserDTO/UserCreateDTO'
import UserDTO from '../../../Kivora.AppCore/DTO/UserDTO/UserDTO'
import { plainToInstance } from 'class-transformer'
import settings from '../../Settings'

@controller(`${settings.API_V1_STR}/user`)
export default class UserController {
    /**
     *  @swagger
     *  tags:
     *      name: User
     *      description: Gestión de usuarios
     */
    private userService: IUserService

    constructor(@inject('IUserService') userService: IUserService) {
        this.userService = userService
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
        // Returning the UserDTO
        const response = plainToInstance(UserDTO, newUser, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
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
