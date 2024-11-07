import Product from '@Kivora.Domain/Entities/Product'
import IRepository from './IRepository'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'

export default interface IProductRepository
    extends IRepository<Product, ProductCreateDTO, ProductUpdateDTO> {
    GetById(id: string): Promise<Product | null>
    GetRecommendedProductInDB(ids: Array<string>): Promise<Array<Product>>
    GetProductsByCategoryInDB(
        category: string,
        limit: number
    ): Promise<Array<Product>>
    Count(): Promise<number>
}
