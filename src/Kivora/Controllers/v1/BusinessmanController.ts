import { Request, Response } from 'express'
import {
    controller,
    httpGet,
    httpPatch,
    httpPost
} from 'inversify-express-utils'
import settings from '../../Settings'
import ValidationMiddleware from '../../Middlewares/ValidationMiddleware'
import BusinessmanCreateDTO from '../../../Kivora.AppCore/DTO/BusinessmanDTO/BusinessmanCreateDTO'
import IBusinessmanRepository from '../../../Kivora.Domain/Interfaces/IBusinessmanRepository'
import { inject } from 'inversify'
import Businessman from '@Kivora.Domain/Entities/Businessman'
import { plainToInstance } from 'class-transformer'
import BusinessmanDTO from '@Kivora.AppCore/DTO/BusinessmanDTO/BusinessmanDTO'
import IUserService from '@Kivora.AppCore/Interfaces/IUserService'
import IBusinessmanService from '@Kivora.AppCore/Interfaces/IBusinessmanService'
import JWT from '@Kivora/libs/JWT'
import Nodemailer from '@Kivora/libs/Nodemailer'
import BusinessmanUpdateDTO from '@Kivora.AppCore/DTO/BusinessmanDTO/BusinessmanUpdateDTO'
import JWTMiddleware from '@Kivora/Middlewares/JWTMiddleware'

@controller(`${settings.API_V1_STR}/businessman`)
export default class BusinessmanController {
    /**
     *  @swagger
     *  tags:
     *      name: Businessman
     *      description: Businessman management
     */
    private businessmanService: IBusinessmanService
    private userService: IUserService

    constructor(
        @inject('IBusinessmanService')
        businessmanService: IBusinessmanRepository,
        @inject('IUserService')
        userService: IUserService
    ) {
        this.businessmanService = businessmanService
        this.userService = userService
    }

    /**
     *  @swagger
     *  /api/v1/businessman:
     *      post:
     *          summary: Create a new businessman
     *          security: []
     *          tags: [Businessman]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/BusinessmanCreateDTO'
     *          responses:
     *              200:
     *                  description: User created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/BusinessmanDTO'
     */
    @httpPost('/', ValidationMiddleware.body(BusinessmanCreateDTO))
    public async CreateBusinessman(
        req: Request,
        res: Response
    ): Promise<Response> {
        const businessman: BusinessmanCreateDTO = req.body
        // Getting the user by username and email
        const userDB = await this.userService.GetByUsername(
            businessman.user.username
        )
        const emailDB = await this.userService.GetByEmail(
            businessman.user.email
        )
        // Validating
        if (
            businessman.user.password !== businessman.user.passwordConfirmation
        ) {
            return res.status(400).json('Las contraseñas son diferentes')
        }
        if (userDB) {
            return res.status(409).json('El username ya esta en uso')
        }
        if (emailDB) {
            return res.status(409).json({ message: 'El email ya esta en uso' })
        }
        // Creating a new Businessman
        const newBusinessman: Businessman =
            await this.businessmanService.Create(businessman)
        // Generating the token
        const token = JWT.GenerateNewAccountToken(newBusinessman.id)
        // Sending an email to verify if the user is real and activate the account
        if (settings.EMAILS_ENABLED && businessman.user.email) {
            await Nodemailer.SendNewAccountEmail(
                businessman.user.email,
                businessman.user.username,
                token
            )
        }
        // Returning the data
        const result = plainToInstance(BusinessmanDTO, newBusinessman, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(result)
    }

    /**
     *  @swagger
     *  /api/v1/businessman:
     *      patch:
     *          summary: Update Businessman
     *          tags: [Businessman]
     *          security:
     *              - oAuth2Password: []
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/BusinessmanUpdateDTO'
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
    @httpPatch(
        '/',
        JWTMiddleware.VerifyJWT(),
        ValidationMiddleware.body(BusinessmanUpdateDTO)
    )
    public async UpdateBusinessman(
        req: Request,
        res: Response
    ): Promise<Response> {
        const id: number = res.locals.userId
        const businessmanUpdate: BusinessmanUpdateDTO = req.body
        // Updating the businessman
        await this.businessmanService.Update(id, businessmanUpdate)
        return res
            .status(200)
            .json({ msg: 'Emprendedor actualizado correctamente' })
    }

    /**
     *  @swagger
     *  /api/v1/businessman/me:
     *      get:
     *          summary: Get Current Businessman
     *          tags: [Businessman]
     *          security:
     *              - oAuth2Password: []
     *          responses:
     *              200:
     *                  description: User created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/BusinessmanDTO'
     */
    @httpGet('/me', JWTMiddleware.VerifyJWT())
    public async GetCurrentBusinessman(
        _req: Request,
        res: Response
    ): Promise<Response> {
        const userId = res.locals.userId
        const businessman = plainToInstance(
            BusinessmanDTO,
            await this.businessmanService.GetById(userId),
            { excludeExtraneousValues: true }
        )
        return res.status(200).json(businessman)
    }
}
