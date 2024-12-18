import { Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          UserCreateDTO:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      example: reduhq
 *                  password:
 *                      type: string
 *                      example: 12345678
 *                  email:
 *                      type: string
 *                      example: reduhq@gmail.com
 *                  name:
 *                      type: string
 *                      example: Rey
 *                  lastname:
 *                      type: string
 *                      example:  Halsall
 */
export default class UserCreateDTO {
    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'El username no puede estar vacio' })
    username: string = ''

    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacia' })
    @MinLength(8, { message: 'La contraseña es muy corta' })
    password: string = ''

    @Expose()
    @IsEmail()
    @IsNotEmpty({ message: 'El Email no puede estar vacio' })
    email: string = ''

    @Expose()
    @IsString({ message: 'El nombre no puede estar vacio' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
    name: string = ''

    @Expose()
    @IsString({ message: 'El apellido no puede estar vacio' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacio' })
    lastname!: string
}
