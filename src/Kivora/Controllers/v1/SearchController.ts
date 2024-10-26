import { Request, Response } from 'express'
import ISearchService from '@Kivora.AppCore/Interfaces/ISearchService'
import SearchCreateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchCreateDTO'
import settings from '@Kivora.Infraestructure/Settings'
import ValidationMiddleware from '@Kivora/Middlewares/ValidationMiddleware'
import { inject } from 'inversify'
import { controller, httpPost } from 'inversify-express-utils'
import { plainToInstance } from 'class-transformer'
import SearchDTO from '@Kivora.Domain/DTO/SearchDTO/SearchDTO'

@controller(`${settings.API_V1_STR}/search`)
export default class SearchController {
    /**
     *  @swagger
     *  tags:
     *      name: Search
     *      description: Seatch str management
     */
    private readonly searchService: ISearchService
    constructor(@inject('ISearchService') searchService: ISearchService) {
        this.searchService = searchService
    }

    /**
     *  @swagger
     *  /api/v1/search:
     *      post:
     *          summary: Create a new search str
     *          tags: [Search]
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/SearchCreateDTO'
     *          responses:
     *              200:
     *                  description: Search str created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/SearchDTO'
     */
    @httpPost('/', ValidationMiddleware.body(SearchCreateDTO))
    public async Create(req: Request, res: Response): Promise<Response> {
        const search = req.body
        const searchStr = await this.searchService.Create(search)
        const response = plainToInstance(SearchDTO, searchStr, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }
}
