import { Request, Response } from 'express'
import { controller, httpPost } from 'inversify-express-utils'
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
        // Returning the data
        const result = plainToInstance(BusinessmanDTO, newBusinessman, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(result)
    }
}
