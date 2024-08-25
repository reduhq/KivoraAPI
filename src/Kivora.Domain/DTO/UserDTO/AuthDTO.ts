import { Expose } from 'class-transformer'
import { IsString, IsNotEmpty } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          AuthDTO:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      example: reduhq
 *                  password:
 *                      type: string
 *                      example: 12345678
 */
export default class AuthDTO {
    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'El username no puede estar vacío' })
    username: string = ''

    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    password: string = ''
}
