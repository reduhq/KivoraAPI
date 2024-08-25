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
 *          profilePicture:
 *            type: string
 *            description: URL de la imagen de perfil del usuario
 *            example: http://example.com/profile.jpg
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
    profilePicture?: string

    @Expose()
    @IsOptional()
    @IsString()
    phone?: string
}
