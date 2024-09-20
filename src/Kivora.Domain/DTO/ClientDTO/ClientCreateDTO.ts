import { Expose, Type } from 'class-transformer'
import UserCreateDTO from '../UserDTO/UserCreateDTO'
import { IsNotEmpty, ValidateNested } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          ClientCreateDTO:
 *              type: object
 *              properties:
 *                  user:
 *                      $ref: '#/components/schemas/UserCreateDTO'
 */
export default class ClientCreateDTO {
    @Expose()
    @ValidateNested()
    @Type(() => UserCreateDTO)
    @IsNotEmpty({ message: 'El objeto User no puede estar vacio' })
    user!: UserCreateDTO
}
