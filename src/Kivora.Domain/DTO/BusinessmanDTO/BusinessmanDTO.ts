import { Expose, Type } from 'class-transformer'
import UserDTO from '../UserDTO/UserDTO'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          BusinessmanDTO:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  user:
 *                      $ref: '#/components/schemas/UserDTO'
 */
export default class BusinessmanDTO {
    @Expose()
    id!: string

    @Expose()
    @Type(() => UserDTO)
    user: UserDTO = new UserDTO()
}
