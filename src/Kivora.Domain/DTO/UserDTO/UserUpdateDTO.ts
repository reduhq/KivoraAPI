import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

/**
 *  @swagger
 *  components:
 *    schemas:
 *      UserUpdateDTO:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: Nombre completo del usuario
 *            example: John Doe
 *          phone:
 *            type: string
 *            description: Número de teléfono del usuario
 *            example: +1234567890
 */
export default class UserUpdateDTO {
    @Expose()
    @IsOptional()
    @IsString()
    name?: string

    @Expose()
    @IsOptional()
    @IsString()
    phone?: string
}
