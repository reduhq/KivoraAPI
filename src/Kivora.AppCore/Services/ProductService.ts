import IProductService from '@Kivora.AppCore/Interfaces/IProductService'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'
import Product from '@Kivora.Domain/Entities/Product'
import IProductRepository from '@Kivora.Domain/Interfaces/IProductRepository'
import { inject, injectable } from 'inversify'

@injectable()
export default class ProductService implements IProductService {
    private readonly productRepository: IProductRepository

    constructor(
        @inject('IProductRepository') productRepository: IProductRepository
    ) {
        this.productRepository = productRepository
    }

    public async Create(t: ProductCreateDTO): Promise<Product> {
        return this.productRepository.Create(t)
    }

    public async Update(
        id: number,
        t: ProductUpdateDTO
    ): Promise<Product | null> {
        // validating if the product exists
        const product = await this.productRepository.GetById(id)
        if (!product) return null
        // updating the product
        return await this.productRepository.Update(id, t)
    }

    public async Delete(id: number): Promise<boolean> {
        // validating if the product exists
        const product = await this.productRepository.GetById(id)
        if (!product) return false
        // deleting the product
        return this.productRepository.Delete(id)
    }

    public async GetAll(): Promise<Product[]> {
        return await this.productRepository.GetAll()
    }
}
