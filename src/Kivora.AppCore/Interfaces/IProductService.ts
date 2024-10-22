import Product from '@Kivora.Domain/Entities/Product'
import IService from './IService'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'

export default interface IProductService
    extends IService<Product, ProductCreateDTO, ProductUpdateDTO> {
    GetRecommendedProduct(id: number): Promise<Array<Product>>
    GetProductsByCategoryInDB(
        category: string,
        limit: number
    ): Promise<Array<Product>>
    Count(): Promise<number>
}
