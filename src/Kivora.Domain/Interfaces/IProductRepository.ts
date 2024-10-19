import Product from '@Kivora.Domain/Entities/Product'
import IRepository from './IRepository'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'

export default interface IProductRepository
    extends IRepository<Product, ProductCreateDTO, ProductUpdateDTO> {
    GetById(id: number): Promise<Product | null>
    GetRecommendedProductInDB(ids: Array<number>): Promise<Array<Product>>
    GetProductsByCategoryInDB(
        category: string,
        limit: number
    ): Promise<Array<Product>>
}
