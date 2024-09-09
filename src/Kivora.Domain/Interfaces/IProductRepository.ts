import Product from '@Kivora.Domain/Entities/Product'
import IRepository from './IRepository'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'

export default interface IProductRepository
    extends IRepository<Product, ProductCreateDTO, ProductUpdateDTO> {
    GetById(id: number): Promise<Product | null>
}
