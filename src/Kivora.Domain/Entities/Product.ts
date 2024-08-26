import { Expose } from 'class-transformer'

export default class Product {
    @Expose()
    public id: number = 0

    @Expose()
    public businessId: number = 0

    @Expose()
    public name: string = ''

    @Expose()
    public description: string = ''

    @Expose()
    public price: number = 0.0

    @Expose()
    public stock: number = 0

    @Expose()
    public rate: number = 0

    @Expose()
    public isActive: boolean = true

    @Expose()
    public tags: string = ''
}
