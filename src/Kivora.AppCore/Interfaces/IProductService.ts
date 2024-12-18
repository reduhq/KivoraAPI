import Product from '@Kivora.Domain/Entities/Product'
import IService from './IService'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'

export default interface IProductService
    extends IService<Product, ProductCreateDTO, ProductUpdateDTO> {
    GetRecommendedProduct(id: string): Promise<Array<Product>>
    GetProductsByCategoryInDB(
        category: string,
        limit: number
    ): Promise<Array<Product>>
    Count(): Promise<number>
    GetById(id: string): Promise<Product | null>
    GetByQuery(
        query: string,
        page?: number,
        limit?: number
    ): Promise<{
        data: Product[]
        currentPage: number
        totalPages: number
        totalProducts: number
        pageSize: number
        hasNextPage: boolean
        hasPreviousPage: boolean
    }>
}
