import IProductService from '@Kivora.AppCore/Interfaces/IProductService'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'
import Product from '@Kivora.Domain/Entities/Product'
import IProductRepository from '@Kivora.Domain/Interfaces/IProductRepository'
import { inject, injectable } from 'inversify'
import axios from 'axios'

@injectable()
export default class ProductService implements IProductService {
    private readonly productRepository: IProductRepository

    constructor(
        @inject('IProductRepository') productRepository: IProductRepository
    ) {
        this.productRepository = productRepository
    }

    public async Count(): Promise<number> {
        return await this.productRepository.Count()
    }

    public async GetProductsByCategoryInDB(
        category: string,
        limit: number
    ): Promise<Array<Product>> {
        return await this.productRepository.GetProductsByCategoryInDB(
            category,
            limit
        )
    }

    public async GetRecommendedProduct(id: number): Promise<Array<Product>> {
        const apiUrl = `https://algoritmosugerencia.onrender.com/recomendaciones/${id}`

        try {
            // Realiza la solicitud GET a la API
            const response = await axios.get<Array<{ id2: number }>>(apiUrl)

            // Extraer el campo 'id2' de cada elemento del arreglo
            const ids2 = response.data.map((product) => product.id2)

            // Devuelve solo los valores de 'id2'
            return await this.productRepository.GetRecommendedProductInDB(ids2)
        } catch (error) {
            console.error(
                'Error al consultar la API de recomendaciones:',
                error
            )
            // En caso de error, puedes lanzar una excepción o devolver un array vacío
            throw new Error('No se pudo obtener las recomendaciones')
        }
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

    public async GetAll(limit: number, page: number): Promise<Product[]> {
        return await this.productRepository.GetAll(limit, page)
    }
}
