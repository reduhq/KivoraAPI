import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import IUserService from "../../../Kivora.AppCore/Interfaces/IUserService";
import { inject } from "inversify";
import { body } from "express-validator";
import settings from "../../Settings";
import ValidationMiddleware from "../../Middlewares/ValidationMiddleware";
import JWT from "../../libs/JWT";


@controller(`${settings.API_V1_STR}`)
export default class LoginController{
    /**
     *  @swagger
     *  tags:
     *      name: Auth
     *      description: Autenticación de usuarios
     */
    private userService: IUserService

    constructor(@inject('IUserService') userService:IUserService){
        this.userService = userService
    }

    /**
     *  @swagger
     *  /api/v1/login/access-token:
     *      post:
     *          summary: Login user
     *          description: Login a user and returning a JWT
     *          security: []
     *          tags: [Auth]
     */
    @httpPost('/login/access-token',
        body('username').isString().withMessage('El username deberia ser un string').notEmpty().withMessage('El username no puede estar vacio'),
        body('password').isString().withMessage('La contraseña deberia ser un string').notEmpty().withMessage('La contraseña no puede estar vacia'),
        ValidationMiddleware.validate()
    )
    public async LoginAccessToken(req:Request, res:Response): Promise<Response>{
        const {username, password} = req.body
        // Validating the username and password
        const user = await this.userService.Authenticate(username, password)
        if(!user){
            return res.status(400).json('Credenciales invalidas')
        }
        return res.status(200).json({
            "access_token": JWT.CreateJWT(user.id, settings.ACCESS_TOKEN_EXPIRES_MINUTES),
            "token_type": "bearer"
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
    public async a (_req:Request, _res:Response) {
        // Lógica para endpoint protegido
        console.log("protegido diuuuuuuuuuuuu")
    }
}