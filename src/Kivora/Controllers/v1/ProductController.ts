import { Request, Response } from 'express'
import IProductService from '@Kivora.AppCore/Interfaces/IProductService'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import settings from '@Kivora.Infraestructure/Settings'
import ValidationMiddleware from '@Kivora/Middlewares/ValidationMiddleware'
import { inject } from 'inversify'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import Product from '@Kivora.Domain/Entities/Product'
import { plainToInstance } from 'class-transformer'
import ProductDTO from '@Kivora.Domain/DTO/ProductDTO/ProductDTO'
import JWTMiddleware from '@Kivora/Middlewares/JWTMiddleware'

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
        JWTMiddleware.VerifyJWT(),
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
}
