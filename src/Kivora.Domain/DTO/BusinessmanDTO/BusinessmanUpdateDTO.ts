import { IsNotEmpty, ValidateNested } from 'class-validator'
import UserUpdateDTO from '../UserDTO/UserUpdateDTO'
import { Expose, Type } from 'class-transformer'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          BusinessmanUpdateDTO:
 *              type: object
 *              properties:
 *                  user:
 *                      $ref: '#/components/schemas/UserUpdateDTO'
 */
export default class BusinessmanUpdateDTO {
    @Expose()
    @ValidateNested()
    @Type(() => UserUpdateDTO)
    @IsNotEmpty({ message: 'El campo usuario no puede estar vacio' })
    public user: UserUpdateDTO = new UserUpdateDTO()
}
