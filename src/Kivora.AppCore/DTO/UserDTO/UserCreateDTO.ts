import { Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          UserCreateDTO:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: reduhq
 *                  email:
 *                      type: email
 *                      example: correo@correo.com
 *                  username:
 *                      type: string
 *                      example: reduhq
 *                  password:
 *                      type: string
 *                      example: 12345678
 *                  passwordConfirmation:
 *                      type: string
 *                      example: 12345678
 *                  email:
 *                      type: string
 *                      example: reduhq@gmail.com
 *                  name:
 *                      type: string
 *                      example: Rey Halsall
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
    @IsString()
    @IsNotEmpty({
        message: 'La confirmación de contraseña no puede estar vacía'
    })
    @MinLength(8, { message: 'La confirmación de la contraseña es muy corta' })
    passwordConfirmation: string = ''

    @Expose()
    @IsEmail()
    @IsNotEmpty({ message: 'El Email no puede estar vacio' })
    email: string = ''

    @Expose()
    @IsString({ message: 'El nombre no puede estar vacio' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
    name: string = ''
}
