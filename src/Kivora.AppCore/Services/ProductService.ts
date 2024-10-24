import IProductService from '@Kivora.AppCore/Interfaces/IProductService'
import ProductCreateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductCreateDTO'
import ProductUpdateDTO from '@Kivora.Domain/DTO/ProductDTO/ProductUpdateDTO'
import Product from '@Kivora.Domain/Entities/Product'
import IProductRepository from '@Kivora.Domain/Interfaces/IProductRepository'
import { inject, injectable } from 'inversify'
import fs from 'fs'
import path from 'path'

@injectable()
export default class ProductService implements IProductService {
    private readonly productRepository: IProductRepository
    private matrizRecomendaciones: Array<{
        id1: number
        id2: number
        similitud: number
    }> = []

    private recomendacionesCargadas: Promise<void> // Nueva propiedad
    constructor(
        @inject('IProductRepository') productRepository: IProductRepository
    ) {
        this.productRepository = productRepository
        this.recomendacionesCargadas = this.cargarRecomendaciones() // Inicializar la carga de las recomendaciones
    }

    private async cargarRecomendaciones(): Promise<void> {
        const filePath = path.join(
            __dirname,
            '../../Kivora.Infraestructure/data/matriz_recomendaciones_long.json'
        )

        try {
            const data = await fs.promises.readFile(filePath, 'utf8')
            this.matrizRecomendaciones = JSON.parse(data)
        } catch (err) {
            console.error('Error al leer el archivo JSON:', err)
            throw new Error('No se pudo cargar el archivo de recomendaciones')
        }
    }

    public async GetRecommendedProduct(id: number): Promise<Array<Product>> {
        const n = 8

        // Esperar a que la matriz esté cargada antes de continuar
        await this.recomendacionesCargadas

        // Verificar que la matriz está cargada correctamente
        if (
            !this.matrizRecomendaciones ||
            this.matrizRecomendaciones.length === 0
        ) {
            throw new Error(
                'matrizRecomendaciones no está cargada o está vacía'
            )
        }

        // Filtrar recomendaciones por id
        const recomendaciones = this.matrizRecomendaciones
            .filter((item) => Number(item.id1) === Number(id))
            .sort((a, b) => b.similitud - a.similitud)
            .slice(0, n)

        if (recomendaciones.length == 0) {
            throw new Error(
                `El ID ${id} no se encuentra en las recomendaciones.`
            )
        }

        // Extraer los ids2 de las recomendaciones, convertir a números y buscar los productos en la base de datos
        const ids2 = recomendaciones.map((product) => product.id2)
        // const ids2 = recomendaciones.map((rec) => rec.id2)
        return await this.productRepository.GetRecommendedProductInDB(ids2)
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
