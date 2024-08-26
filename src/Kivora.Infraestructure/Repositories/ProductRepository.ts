import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'
import Product from '@Kivora.Domain/Entities/Product'
import IProductRepository from '@Kivora.Domain/Interfaces/IProductRepository'
import { KivoraContext } from '@Kivora.Domain/KivoraContext'
import { PrismaClient } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { injectable } from 'inversify'

@injectable()
export default class ProductRepository implements IProductRepository {
    private readonly context: PrismaClient

    constructor() {
        this.context = KivoraContext
    }

    public async Create(t: ProductCreateDTO): Promise<Product> {
        const product = await this.context.product.create({
            data: t
        })
        return plainToInstance(Product, product, {
            excludeExtraneousValues: true
        })
    }

    Update(_id: number, _t: ProductUpdateDTO): Promise<Product> {
        throw new Error('Method not implemented.')
    }

    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    GetAll(): Promise<Product[]> {
        throw new Error('Method not implemented.')
    }
}
