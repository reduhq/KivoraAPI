import { Expose, Type } from 'class-transformer'
import { IsNotEmpty, ValidateNested } from 'class-validator'
import UserUpdateDTO from '../UserDTO/UserUpdateDTO'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          ClientUpdateDTO:
 *              type: object
 *              properties:
 *                  user:
 *                      $ref: '#/components/schemas/UserUpdateDTO'
 */
export default class ClientUpdateDTO {
    @Expose()
    @ValidateNested()
    @Type(() => UserUpdateDTO)
    @IsNotEmpty({ message: 'Los datos del usuario no pueden estar vacios' })
    user!: UserUpdateDTO
}
