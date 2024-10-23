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
import { param, query } from 'express-validator'
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
     *          parameters:
     *              -   in: query
     *                  name: page
     *                  required: false
     *                  schema:
     *                      type: number
     *              -   in: query
     *                  name: limit
     *                  required: false
     *                  schema:
     *                      type: number
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
    @httpGet(
        '/',
        query('limit')
            .isNumeric()
            .withMessage('el limite tiene que ser numerico')
            .default(25),
        query('page')
            .isNumeric()
            .withMessage('La pagina tiene que ser un numero')
            .default(0)
    )
    public async GetAll(req: Request, res: Response): Promise<Response> {
        const { limit, page } = req.query
        const products = await this.productService.GetAll(
            Number(limit),
            Number(page)
        )
        const result = plainToInstance(Product, products)

        const count: number = await this.productService.Count()
        const totalPages = Math.ceil(count / Number(limit))
        const response = {
            data: result,
            currentPage: Number(page),
            totalPages: totalPages,
            totalProducts: count,
            pageSize: Number(limit),
            hasNextPage: Number(page) < totalPages,
            hasPreviousPage: Number(page) > 0
        }
        return res.status(200).json(response)
    }

    /**
     *  @swagger
     *  /api/v1/product/{id}:
     *      get:
     *          summary: Get a single product
     *          tags: [Product]
     *          parameters:
     *              -   in: path
     *                  name: id
     *                  required: true
     *                  schema:
     *                      type: integer
     *          responses:
     *              200:
     *                  description: Product data
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/ProductDTO'
     */
    @httpGet(
        '/:id',
        param('id')
            .isNumeric()
            .withMessage('El id debe de ser un numero')
            .notEmpty()
            .withMessage('EL id no puede estar vacio')
    )
    public async GetById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const product = await this.productService.GetById(Number(id))
        const response = plainToInstance(ProductDTO, product, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
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

    /**
     *  @swagger
     *  /api/v1/product/user/{id}:
     *      get:
     *          summary: Get recommended products based on product or user ID
     *          tags: [Product]
     *          parameters:
     *              - in: path
     *                name: id
     *                schema:
     *                  type: integer
     *                required: true
     *                description: ID of the product or user for which recommendations are being fetched
     *          responses:
     *              200:
     *                  description: List of recommended products
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#/components/schemas/ProductDTO'
     *              400:
     *                  description: Invalid ID supplied
     *              404:
     *                  description: Product not found
     */
    @httpGet('/user/:id')
    public async GetRecommendedProduct(
        req: Request,
        res: Response
    ): Promise<Response> {
        const { id } = req.params // Obtener el 'id' desde la URL
        const products = await this.productService.GetRecommendedProduct(
            Number(id)
        ) // Convertir el ID a número si es necesario
        const result = plainToInstance(Product, products)
        return res.status(200).json(result)
    }

    /**
     * @swagger
     * /api/v1/product/category/{category}:
     *   get:
     *     summary: Get products by category
     *     tags: [Product]
     *     parameters:
     *       - in: path
     *         name: category
     *         schema:
     *           type: string
     *         required: true
     *         description: The category of the products to be fetched
     *     responses:
     *       200:
     *         description: List of products by category
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ProductDTO'
     *       400:
     *         description: Invalid category supplied
     *       404:
     *         description: No products found for the given category
     */
    @httpGet('/category/:category')
    public async GetProductsByCategory(
        req: Request,
        res: Response
    ): Promise<Response> {
        console.log('dasd')
        const { category } = req.params // Obtener la categoría desde la URL

        // console.log(category)

        const products = await this.productService.GetProductsByCategoryInDB(
            category,
            10
        )

        const result = plainToInstance(Product, products)
        return res.status(200).json(result)
    }
}
