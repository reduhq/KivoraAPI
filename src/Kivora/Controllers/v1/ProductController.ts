import { Request, Response } from 'express'
import IProductService from '@Kivora.AppCore/Interfaces/IProductService'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import settings from '@Kivora.Infraestructure/Settings'
import ValidationMiddleware from '@Kivora/Middlewares/ValidationMiddleware'
import { inject } from 'inversify'
import {
    controller,
    httpDelete,
    httpGet,
    httpPatch,
    httpPost
} from 'inversify-express-utils'
import Product from '@Kivora.Domain/Entities/Product'
import { plainToInstance } from 'class-transformer'
import ProductDTO from '@Kivora.Domain/DTO/ProductDTO/ProductDTO'
import JWTMiddleware from '@Kivora/Middlewares/JWTMiddleware'
import { param } from 'express-validator'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'

@controller(`${settings.API_V1_STR}/product`)
export default class ProductController {
    /**
     *  @swagger
     *  tags:
     *      name: Product
     *      description: Products management
     */
    private readonly productService: IProductService

    constructor(@inject('IProductService') productService: IProductService) {
        this.productService = productService
    }

    /**
     *  @swagger
     *  /api/v1/product:
     *      get:
     *          summary: Get all registered products
     *          tags: [Product]
     *          responses:
     *              200:
     *                  description: List of products
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#/components/schemas/ProductDTO'
     */
    @httpGet('/')
    public async GetAll(_req: Request, res: Response): Promise<Response> {
        const products = await this.productService.GetAll()
        const result = plainToInstance(Product, products)
        return res.status(200).json(result)
    }

    /**
     *  @swagger
     *  /api/v1/product:
     *      post:
     *          summary: Create a new product
     *          security:
     *              - oAuth2Password: []
     *          tags: [Product]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ProductCreateDTO'
     *          responses:
     *              200:
     *                  description: User created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/ProductDTO'
     */
    @httpPost(
        '/',
        JWTMiddleware.GetCurrentBusinessman(),
        ValidationMiddleware.body(ProductCreateDTO)
    )
    public async Create(req: Request, res: Response): Promise<Response> {
        const productCreate: ProductCreateDTO = req.body
        // TODO: Validating the business belongs to the current businessman
        // Creating a new product
        const product: Product = await this.productService.Create(productCreate)
        // Rreturning the response
        const response = plainToInstance(ProductDTO, product, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/product/{id}:
     *      patch:
     *          summary: Update a product
     *          security:
     *              - oAuth2Password: []
     *          tags: [Product]
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
     *                          $ref: '#/components/schemas/ProductUpdateDTO'
     *          responses:
     *              200:
     *                  description: Product updated successfully
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
        JWTMiddleware.GetCurrentBusinessman(),
        param('id')
            .isNumeric()
            .withMessage('El id tiene que ser un numero')
            .exists()
            .withMessage('El id es obligatorio')
            .notEmpty()
            .withMessage('El id no puede estar vacio'),
        ValidationMiddleware.validate(),
        ValidationMiddleware.body(ProductUpdateDTO)
    )
    public async Update(req: Request, res: Response): Promise<Response> {
        const id: number = parseInt(req.params.id)
        const productUpdate: ProductUpdateDTO = req.body
        // Updating the product
        const product = await this.productService.Update(id, productUpdate)
        if (!product) {
            return res.status(400).json({ msg: 'error' })
        }
        // Returning the response
        return res
            .status(200)
            .json({ meg: 'El Producto ha sido actualizado exitosamente' })
    }

    /**
     *  @swagger
     *  /api/v1/product/{id}:
     *      delete:
     *          summary: Delete a product
     *          security:
     *              - oAuth2Password: []
     *          tags: [Product]
     *          parameters:
     *              -   in: path
     *                  name: id
     *                  required: true
     *                  schema:
     *                      type: integer
     *          responses:
     *              200:
     *                  description: Product deleted successfully
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
        ValidationMiddleware.validate(),
        JWTMiddleware.GetCurrentBusinessman()
    )
    public async Delete(req: Request, res: Response): Promise<Response> {
        const id: number = parseInt(req.params.id)
        const product = await this.productService.Delete(id)
        if (!product)
            return res
                .status(400)
                .json('El producto que se quiere eliminar no existe')
        return res
            .status(200)
            .json('El producto ha sido eliminado exitosamente')
    }
}
