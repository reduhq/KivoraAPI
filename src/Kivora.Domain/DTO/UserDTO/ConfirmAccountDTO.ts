import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          ConfirmAccountDTO:
 *              type: object
 *              properties:
 *                  token:
 *                      type: string
 *                      description: Token de confirmación de cuenta
 *                      example: "abcdef123456"
 */
export class ConfirmAccountDTO {
    @Expose()
    @IsString()
    @IsNotEmpty({ message: 'El token no puede estar vacío' })
    token: string = ''
}
