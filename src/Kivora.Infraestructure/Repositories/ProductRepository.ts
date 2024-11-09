import { SearchClient } from '@algolia/client-search'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'
import Product from '@Kivora.Domain/Entities/Product'
import IProductRepository from '@Kivora.Domain/Interfaces/IProductRepository'
import { KivoraContext } from '@Kivora.Domain/KivoraContext'
import { algoliaClient } from '@Kivora.Infraestructure/Data/KivoraAlgoliaContext'
import { PrismaClient } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { injectable } from 'inversify'

@injectable()
export default class ProductRepository implements IProductRepository {
    private readonly context: PrismaClient
    private readonly algoliaContext: SearchClient

    constructor() {
        this.context = KivoraContext
        this.algoliaContext = algoliaClient
    }

    public async GetByQuery(
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
    }> {
        const products = await this.algoliaContext.search<Product>({
            requests: [
                {
                    indexName: 'product_index',
                    query: query,
                    hitsPerPage: limit,
                    page: page
                }
            ]
        })
        console.log(products)
        // return {}
        return {
            data: plainToInstance(
                Product,
                (products.results[0] as { hits: Product[] }).hits,
                {
                    excludeExtraneousValues: true
                }
            ),
            currentPage: (products.results[0] as { page: number }).page,
            totalPages: (products.results[0] as { nbPages: number }).nbPages,
            totalProducts: (products.results[0] as { nbHits: number }).nbHits,
            pageSize: (products.results[0] as { hitsPerPage: number })
                .hitsPerPage,
            hasNextPage:
                (products.results[0] as { page: number }).page <
                (products.results[0] as { nbPages: number }).nbPages,
            hasPreviousPage: (products.results[0] as { page: number }).page > 0
        }
    }

    public async Count(): Promise<number> {
        return await this.context.product.count()
    }

    public async GetProductsByCategoryInDB(
        category: string,
        limit: number
    ): Promise<Array<Product>> {
        try {
            // Realiza una búsqueda en la base de datos de los productos que coincidan con la categoría
            const productsByCategory = await this.context.product.findMany({
                where: {
                    category: category // Coincide con la categoría proporcionada
                },
                take: limit // Limita la cantidad de productos retornados
            })

            // Retorna los productos encontrados
            return plainToInstance(Product, productsByCategory)
        } catch (error) {
            console.error('Error al consultar la base de datos:', error)
            // En caso de error, puedes lanzar una excepción o devolver un array vacío
            throw new Error(
                'No se pudo obtener los productos por categoría de la base de datos'
            )
        }
    }

    public async GetRecommendedProductInDB(
        ids: Array<string>
    ): Promise<Array<Product>> {
        try {
            // Realiza una búsqueda en la base de datos de los productos que coincidan con los ids
            const recommendedProducts = await this.context.product.findMany({
                where: {
                    id: {
                        in: ids.map((i) => i.toString()) // Busca todos los productos cuyo id esté en el array `ids`
                    }
                }
            })

            // Retorna los productos encontrados
            return plainToInstance(Product, recommendedProducts)
        } catch (error) {
            console.error('Error al consultar la base de datos:', error)
            // En caso de error, puedes lanzar una excepción o devolver un array vacío
            throw new Error(
                'No se pudo obtener los productos de la base de datos'
            )
        }
    }

    public async GetById(id: string): Promise<Product | null> {
        const product = await this.context.product.findFirst({
            where: {
                id: id.toString()
            }
        })
        if (!product) return null
        return plainToInstance(Product, product, {
            excludeExtraneousValues: true
        })
    }

    public async Create(t: ProductCreateDTO): Promise<Product> {
        const product = await this.context.product.create({
            data: {
                id: 'REMOVE THIS FIELD,',
                businessId: t.businessId,
                name: t.name,
                description: t.description,
                price: t.price,
                stock: t.stock,
                category: t.category,
                imageUrl: t.imageUrl,
                tags: t.tags
            }
        })
        return plainToInstance(Product, product, {
            excludeExtraneousValues: true
        })
    }

    public async Update(id: number, t: ProductUpdateDTO): Promise<Product> {
        const product = await this.context.product.update({
            data: t,
            where: {
                id: id.toString()
            }
        })
        return plainToInstance(Product, product, {
            excludeExtraneousValues: true
        })
    }

    public async Delete(id: number): Promise<boolean> {
        const product = await this.context.product.delete({
            where: {
                id: id.toString()
            }
        })
        return !!product
    }

    public async GetAll(limit: number, page: number): Promise<Product[]> {
        const product = await this.context.product.findMany({
            skip: page * limit,
            take: limit
        })
        return plainToInstance(Product, product)
    }
}
