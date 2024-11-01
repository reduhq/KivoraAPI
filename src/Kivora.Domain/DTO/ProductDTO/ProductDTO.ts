import { Expose } from 'class-transformer'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          ProductDTO:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  businessId:
 *                      type: integer
 *                      example: 1
 *                  name:
 *                      type: string
 *                      example: Zapatos Nike
 *                  description:
 *                      type: string
 *                      example: ''
 *                  price:
 *                      type: float
 *                      example: 1500
 *                  imageUrl:
 *                      type: string
 *                      example: ''
 *                  stock:
 *                      type: integer
 *                      example: 5
 *                  rate:
 *                      type: integer
 *                      example: 10
 *                  isActive:
 *                      type: boolean
 *                      example: true
 *                  tags:
 *                      type: string
 *                      example: ''
 */
export default class ProductDTO {
    @Expose()
    public id!: string

    @Expose()
    public businessId: number = 0

    @Expose()
    public name: string = ''

    @Expose()
    public description: string = ''

    @Expose()
    public imageUrl: string = ''

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
