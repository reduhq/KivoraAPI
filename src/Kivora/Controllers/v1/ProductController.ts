import IProductService from '@Kivora.AppCore/Interfaces/IProductService'
import settings from '@Kivora.Infraestructure/Settings'
import { inject } from 'inversify'
import { controller } from 'inversify-express-utils'

@controller(`${settings.API_V1_STR}/product`)
export default class ProductController {
    private readonly productService: IProductService

    constructor(@inject('IProductService') productService: IProductService) {
        this.productService = productService
    }
}
