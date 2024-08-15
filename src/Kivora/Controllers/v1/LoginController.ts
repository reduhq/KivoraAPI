import { Request, Response } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import IUserService from '../../../Kivora.AppCore/Interfaces/IUserService'
import { inject } from 'inversify'
import settings from '../../Settings'
import ValidationMiddleware from '../../Middlewares/ValidationMiddleware'
import JWT from '../../libs/JWT'
import AuthDTO from '../../../Kivora.AppCore/DTO/UserDTO/AuthDTO'
import ITokenService from '@Kivora.AppCore/Interfaces/ITokenService'
import { IEmailService } from '@Kivora.AppCore/Interfaces/IEmailService'

@controller(`${settings.API_V1_STR}`)
export default class LoginController {
    /**
     *  @swagger
     *  tags:
     *      name: Auth
     *      description: Autenticación de usuarios
     */
    private userService: IUserService
    private tokenService: ITokenService
    private emailService: IEmailService

    constructor(
        @inject('IUserService') userService: IUserService,
        @inject('ITokenService') tokenService: ITokenService,
        @inject('IEmailService') emailService: IEmailService
    ) {
        this.userService = userService
        this.tokenService = tokenService
        this.emailService = emailService
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
    @httpPost(
        '/login/access-token',
        ValidationMiddleware.body(AuthDTO),
        ValidationMiddleware.validate()
    )
    public async LoginAccessToken(
        req: Request,
        res: Response
    ): Promise<Response<AuthDTO>> {
        const { username, password } = req.body

        const usernameExist = await this.userService.GetByUsername(username)

        if (!usernameExist) {
            return res.status(400).json({ message: 'Usuario no encontrado' })
        }

        if (!usernameExist.confirmed) {
            const token = await this.tokenService.GenerateToken(
                usernameExist.id
            )
            // Confirmation Email
            await this.emailService.sendConfirmationEmail({
                email: usernameExist.email,
                name: usernameExist.username,
                token: token.token
            })
            const error = new Error(
                'La cuenta no ha sido confirmada, hemos enviado un e-mail de confirmación'
            )
            return res.status(401).json({ error: error.message })
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

    /**
     * @swagger
     * /api/v1/protected:
     *   get:
     *     summary: Protected endpoint
     *     description: This endpoint requires a valid JWT token
     *     security:
     *       - bearerAuth: []
     *     tags:
     *       - Protected
     */
    @httpGet('/protected')
    public async a(_req: Request, _res: Response) {
        // Lógica para endpoint protegido
        console.log('protegido diuuuuuuuuuuuu')
    }
}
