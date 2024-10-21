import { Request, Response } from 'express'
import { controller, httpPost } from 'inversify-express-utils'
import IUserService from '../../../Kivora.AppCore/Interfaces/IUserService'
import { inject } from 'inversify'
import settings from '../../../Kivora.Infraestructure/Settings'
import ValidationMiddleware from '../../Middlewares/ValidationMiddleware'
import JWT from '../../../Kivora.Infraestructure/libs/JWT'
import AuthDTO from '../../../Kivora.Domain/DTO/UserDTO/AuthDTO'
// import ITokenService from '@Kivora.AppCore/Interfaces/ITokenService'
// import INodemailerProvider from '@Kivora.Domain/Interfaces/Providers/INodemailerProvider'

@controller(`${settings.API_V1_STR}`)
export default class LoginController {
    /**
     *  @swagger
     *  tags:
     *      name: Auth
     *      description: Autenticación de usuarios
     */
    private userService: IUserService
    // private tokenService: ITokenService
    // private nodeMailerProvider: INodemailerProvider

    constructor(
        @inject('IUserService') userService: IUserService
        // @inject('ITokenService') tokenService: ITokenService,
        // @inject('INodemailerProvider') nodeMailerProvider: INodemailerProvider
    ) {
        this.userService = userService
        // this.tokenService = tokenService
        // this.nodeMailerProvider = nodeMailerProvider
    }
    /**
     *  @swagger
     *  /api/v1/login/access-token:
     *      post:
     *          summary: Login user
     *          description: Login a user and return a JWT.
     *          tags: [Auth]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/AuthDTO'
     *          responses:
     *              200:
     *                  description: Login successful, JWT returned.
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  access_token:
     *                                      type: string
     *                                      description: JWT access token
     *                                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     *                                  token_type:
     *                                      type: string
     *                                      description: Type of the token
     *                                      example: bearer
     *              400:
     *                  description: Invalid credentials or unconfirmed user.
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                      example: Credenciales invalidas
     */
    @httpPost('/login/access-token', ValidationMiddleware.body(AuthDTO))
    public async LoginAccessToken(
        req: Request,
        res: Response
    ): Promise<Response<AuthDTO>> {
        const { username, password } = req.body

        const userExist = await this.userService.GetByUsername(username)

        if (!userExist) {
            return res.status(400).json({ message: 'Usuario no encontrado' })
        }

        if (!userExist.confirmed) {
            return res.status(401).json('Tu cuenta aún no ha sido confirmada')
        }

        const user = await this.userService.Authenticate(username, password)

        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' })
        }

        return res.status(200).json({
            access_token: JWT.CreateJWT(
                user.id,
                settings.ACCESS_TOKEN_EXPIRES_MINUTES
            ),
            token_type: 'bearer'
        })
    }
}
