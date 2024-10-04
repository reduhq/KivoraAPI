import { Request, Response } from 'express'
import {
    controller,
    httpGet,
    httpPatch,
    httpPost
} from 'inversify-express-utils'
import settings from '../../../Kivora.Infraestructure/Settings'
import ValidationMiddleware from '../../Middlewares/ValidationMiddleware'
import BusinessmanCreateDTO from '../../../Kivora.Domain/DTO/BusinessmanDTO/BusinessmanCreateDTO'
import IBusinessmanRepository from '../../../Kivora.Domain/Interfaces/IBusinessmanRepository'
import { inject } from 'inversify'
import Businessman from '@Kivora.Domain/Entities/Businessman'
import { plainToInstance } from 'class-transformer'
import BusinessmanDTO from '@Kivora.Domain/DTO/BusinessmanDTO/BusinessmanDTO'
import IUserService from '@Kivora.AppCore/Interfaces/IUserService'
import IBusinessmanService from '@Kivora.AppCore/Interfaces/IBusinessmanService'
import JWT from '@Kivora.Infraestructure/libs/JWT'
import Nodemailer from '@Kivora.Infraestructure/libs/Nodemailer'
import BusinessmanUpdateDTO from '@Kivora.Domain/DTO/BusinessmanDTO/BusinessmanUpdateDTO'
import JWTMiddleware from '@Kivora/Middlewares/JWTMiddleware'
import IImageUploadProvider from '@Kivora.Domain/Interfaces/Providers/IImageUploadProvider'
import MulterMiddleware from '@Kivora/Middlewares/MulterMiddleware'

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
    private imageUploadProvider: IImageUploadProvider

    constructor(
        @inject('IBusinessmanService')
        businessmanService: IBusinessmanRepository,
        @inject('IUserService')
        userService: IUserService,
        @inject('IImageUploadProvider')
        imageUploadProvider: IImageUploadProvider
    ) {
        this.businessmanService = businessmanService
        this.userService = userService
        this.imageUploadProvider = imageUploadProvider
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
    @httpGet('/me', JWTMiddleware.GetCurrentBusinessman(true))
    public async GetCurrentBusinessman(
        _req: Request,
        res: Response
    ): Promise<Response> {
        const businessman: Businessman = res.locals.businessmanModel
        const response = plainToInstance(BusinessmanDTO, businessman, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
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
        JWTMiddleware.GetCurrentBusinessman(),
        ValidationMiddleware.body(BusinessmanUpdateDTO)
    )
    public async UpdateBusinessman(
        req: Request,
        res: Response
    ): Promise<Response> {
        // TODO: read the current businessman from res.locals.currentUser
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
     *  /api/v1/businessman/update-image:
     *      patch:
     *          summary: Update the profile picture
     *          tags: [Businessman]
     *          security:
     *              - oAuth2Password: []
     *          requestBody:
     *              content:
     *                  multipart/form-data:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              orderID:
     *                                  type: file
     *                                  required: true
     *          responses:
     *              200:
     *                  description: User created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     */
    @httpPatch(
        '/update-image',
        JWTMiddleware.GetCurrentBusinessman(),
        MulterMiddleware.UploadImage().single('orderID')
    )
    public async UpdateImage(req: Request, res: Response) {
        // TODO: read the current businessman from res.locals.currentUser
        const userId: number = res.locals.userId
        const image: Express.Multer.File | undefined = req.file
        if (!image) {
            return res.status(404).json('Solicitud no valida')
        }
        // Uploading the profile picture
        const imageURL = await this.imageUploadProvider.UploadImage(
            image.buffer
        )
        if (!imageURL) {
            return res
                .status(404)
                .json('Ha ocurrido un error al subir la imagen')
        }
        // Saving the profile picture in the DB
        await this.userService.UpdateProfilePicture(userId, imageURL)

        return res.status(200).json('Foto de perfil actualizada')
    }
}
