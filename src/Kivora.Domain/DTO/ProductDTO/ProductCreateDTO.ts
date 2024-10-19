import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          ProductCreateDTO:
 *              type: object
 *              properties:
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
 *                  stock:
 *                      type: integer
 *                      example: 5
 *                  tags:
 *                      type: string
 *                      example: ''
 *                  category:
 *                      type: string
 *                      example: ''
 *                  imageUrl:
 *                      type: string
 *                      example: ''
 */
export default class ProductCreateDTO {
    @Expose()
    @IsNumber()
    @IsNotEmpty({ message: 'El id del negocio es obligatorio' })
    public businessId!: number

    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    public name!: string

    @Expose()
    @IsString()
    public description!: string

    @Expose()
    @IsNumber()
    @IsNotEmpty({ message: 'El precio del producto no puede estar vacio' })
    public price!: number

    @Expose()
    @IsNumber()
    @IsNotEmpty({ message: 'La cantidad del producto no puede estar vacia' })
    public stock!: number

    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'La categoria del producto no puede estar vacia' })
    public category!: string

    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'La imagen del producto no puede estar vacia' })
    public imageUrl!: string

    @Expose()
    @IsString()
    public tags!: string
}
