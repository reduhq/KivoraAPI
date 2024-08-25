import { Expose, Type } from 'class-transformer'
import UserCreateDTO from '../UserDTO/UserCreateDTO'
import { IsNotEmpty, ValidateNested } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          BusinessmanCreateDTO:
 *              type: object
 *              properties:
 *                  user:
 *                      $ref: '#/components/schemas/UserCreateDTO'
 */
export default class BusinessmanCreateDTO {
    @Expose()
    @ValidateNested()
    @Type(() => UserCreateDTO)
    @IsNotEmpty({ message: 'El objeto User no puede estar vacio' })
    user: UserCreateDTO = new UserCreateDTO()
}
