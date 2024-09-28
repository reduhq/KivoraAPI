import { Expose, Type } from 'class-transformer'
import UserCreateDTO from '../UserDTO/UserCreateDTO'
import { IsNotEmpty, ValidateNested } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          CustomerCreateDTO:
 *              type: object
 *              properties:
 *                  user:
 *                      $ref: '#/components/schemas/UserCreateDTO'
 */
export default class CustomerCreateDTO {
    @Expose()
    @ValidateNested()
    @Type(() => UserCreateDTO)
    @IsNotEmpty({ message: 'El objeto User no puede estar vacio' })
    user!: UserCreateDTO
}
