import { Expose } from 'class-transformer'
import { IsOptional } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          ProductUpdateDTO:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: Zapatos Nike
 *                  description:
 *                      type: string
 *                      example: ''
 *                  price:
 *                      type: float
 *                      example: 1500
 *                  stock:
 *                      type: integer
 *                      example: 5
 *                  isActive:
 *                      type: boolean
 *                      example: true
 *                  tags:
 *                      type: string
 *                      example: ''
 */
export default class ProductUpdateDTO {
    @Expose()
    @IsOptional()
    public name?: string

    @Expose()
    @IsOptional()
    public description?: string

    @Expose()
    @IsOptional()
    public price?: number

    @Expose()
    @IsOptional()
    public stock?: number

    @Expose()
    @IsOptional()
    public isActive?: boolean

    @Expose()
    @IsOptional()
    public tags?: string
}
