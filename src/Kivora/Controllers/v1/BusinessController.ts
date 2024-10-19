import IBusinessService from '@Kivora.AppCore/Interfaces/IBusinessService'
import { plainToInstance } from 'class-transformer'
import { inject } from 'inversify'
import {
    controller,
    httpGet,
    httpPost,
    httpPatch,
    httpDelete
} from 'inversify-express-utils'
import BusinessDTO from '../../../Kivora.Domain/DTO/BusinessDTO/BusinessDTO'
import { Request, Response } from 'express'
import BusinessCreateDTO from '@Kivora.Domain/DTO/BusinessDTO/BusinessCreateDTO'
import ValidationMiddleware from '@Kivora/Middlewares/ValidationMiddleware'
import Business from '@Kivora.Domain/Entities/Business'
import settings from '@Kivora.Infraestructure/Settings'
import { param } from 'express-validator'
import BusinessUpdateDTO from '@Kivora.Domain/DTO/BusinessDTO/BusinessUpdateDTO'

@controller(`${settings.API_V1_STR}/business`)
export default class BusinessController {
    private businessService: IBusinessService

    constructor(
        @inject('IBusinessService')
        businessService: IBusinessService
    ) {
        this.businessService = businessService
    }

    /**
     *  @swagger
     *  /api/v1/business:
     *      get:
     *          summary: Get all businesses
     *          tags: [Business]
     *          responses:
     *              200:
     *                  description: List of businesses
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#/components/schemas/BusinessDTO'
     */

    @httpGet('/')
    public async GetAll(_req: Request, res: Response): Promise<Response> {
        const response = plainToInstance(
            BusinessDTO,
            await this.businessService.GetAll(),
            {
                excludeExtraneousValues: true
            }
        )

        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/business/businessman/{id}:
     *      get:
     *          summary: Get all businesses for a businessman
     *          tags: [Business]
     *          parameters:
     *              - in: path
     *                name: id
     *                required: true
     *                schema:
     *                  type: integer
     *                description: The ID of the businessman
     *          responses:
     *              200:
     *                  description: List of businesses
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#/components/schemas/BusinessDTO'
     */

    @httpGet(
        '/businessman/:id',
        param('id')
            .isNumeric()
            .withMessage('The id must be a number')
            .exists()
            .withMessage('The id is required')
            .notEmpty()
            .withMessage('The id cannot be empty'),
        ValidationMiddleware.validate()
    )
    public async GetByBusinessman(
        _req: Request,
        res: Response
    ): Promise<Response> {
        const id: number = Number(_req.params.id)
        const businesses = await this.businessService.GetByBusinessman(id)

        // Si no se encuentran negocios
        if (!businesses || businesses.length === 0) {
            return res
                .status(404)
                .json({ message: 'No businesses found for this businessman' })
        }

        const response = plainToInstance(BusinessDTO, businesses, {
            excludeExtraneousValues: true
        })

        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/business/{id}:
     *      get:
     *          summary: Get a business by ID
     *          tags: [Business]
     *          parameters:
     *              -   in: path
     *                  name: id
     *                  required: true
     *                  schema:
     *                      type: integer
     *                      example: 1
     *          responses:
     *              200:
     *                  description: Business details
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/BusinessDTO'
     *              404:
     *                  description: Business not found
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *                                      example: Business not found
     */

    @httpGet(
        '/:id',
        param('id')
            .isNumeric()
            .withMessage('The id must be a number')
            .exists()
            .withMessage('The id is required')
            .notEmpty()
            .withMessage('The id cannot be empty'),
        ValidationMiddleware.validate()
    )
    public async GetById(_req: Request, res: Response): Promise<Response> {
        const id: number = parseInt(_req.params.id)
        const business = await this.businessService.GetById(id)

        if (!business) {
            return res.status(404).json({ message: 'Business not found' })
        }

        const response = plainToInstance(BusinessDTO, business, {
            excludeExtraneousValues: true
        })

        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/business:
     *      post:
     *          summary: Create a new business
     *          security:
     *              - oAuth2Password: []
     *          tags: [Business]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/BusinessCreateDTO'
     *          responses:
     *              200:
     *                  description: Business created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/BusinessDTO'
     */

    @httpPost('/', ValidationMiddleware.body(BusinessCreateDTO))
    public async Create(req: Request, res: Response): Promise<Response> {
        const businessCreate: BusinessCreateDTO = req.body

        const business: Business =
            await this.businessService.Create(businessCreate)
        // Rreturning the response
        const response = plainToInstance(BusinessDTO, business, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/business/{id}:
     *      patch:
     *          summary: Update a business
     *          tags: [Business]
     *          parameters:
     *              -   in: path
     *                  name: id
     *                  required: true
     *                  schema:
     *                      type: integer
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/BusinessUpdateDTO'
     *          responses:
     *              200:
     *                  description: Business updated successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     */

    @httpPatch(
        '/:id',
        param('id')
            .isNumeric()
            .withMessage('El id tiene que ser un numero')
            .exists()
            .withMessage('El id es obligatorio')
            .notEmpty()
            .withMessage('El id no puede estar vacio'),
        ValidationMiddleware.validate(),
        ValidationMiddleware.body(BusinessUpdateDTO)
    )
    public async Update(req: Request, res: Response): Promise<Response> {
        const id: number = parseInt(req.params.id)
        const businessUpdate: BusinessUpdateDTO = req.body
        // Updating the product
        const business = await this.businessService.Update(id, businessUpdate)
        if (!business) {
            return res.status(400).json({ msg: 'error' })
        }
        // Returning the response
        return res
            .status(200)
            .json({ meg: 'El Negocio ha sido actualizado exitosamente' })
    }

    /**
     *  @swagger
     *  /api/v1/business/{id}:
     *      delete:
     *          summary: Delete a business
     *          tags: [Business]
     *          parameters:
     *              -   in: path
     *                  name: id
     *                  required: true
     *                  schema:
     *                      type: integer
     *          responses:
     *              200:
     *                  description: Business deleted successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     */
    @httpDelete(
        '/:id',
        param('id')
            .isNumeric()
            .withMessage('El id tiene que ser un numero')
            .exists()
            .withMessage('El id es obligatorio')
            .notEmpty()
            .withMessage('El id no puede estar vacio'),
        ValidationMiddleware.validate()
    )
    public async Delete(req: Request, res: Response): Promise<Response> {
        const id: number = parseInt(req.params.id)
        const business = await this.businessService.Delete(id)
        if (!business)
            return res
                .status(400)
                .json('El Negocio que se quiere eliminar no existe')
        return res.status(200).json('El Negocio ha sido eliminado exitosamente')
    }

    /**
     *  @swagger
     *  /api/v1/business/activate/{id}:
     *      patch:
     *          summary: Activate a business
     *          tags: [Business]
     *          parameters:
     *              -   in: path
     *                  name: id
     *                  required: true
     *                  schema:
     *                      type: integer
     *          responses:
     *              200:
     *                  description: Business activated successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     */
    @httpPatch(
        '/activate/:id',
        param('id')
            .isNumeric()
            .withMessage('El id tiene que ser un número')
            .exists()
            .withMessage('El id es obligatorio')
            .notEmpty()
            .withMessage('El id no puede estar vacío'),
        ValidationMiddleware.validate()
    )
    public async ActivateBusiness(
        req: Request,
        res: Response
    ): Promise<Response> {
        const id: number = parseInt(req.params.id)
        const business = await this.businessService.ActivateBusiness(id)
        if (!business) {
            return res
                .status(400)
                .json({ message: 'Error al activar el negocio' })
        }
        return res
            .status(200)
            .json({ message: 'El Negocio ha sido reactivado exitosamente' })
    }
}
