import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          SearchCreateDTO:
 *              type: object
 *              properties:
 *                  text:
 *                      type: string
 *                      example: ''
 */
export default class SearchCreateDTO {
    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'El campo text puede estar vacio' })
    public text!: string
}
