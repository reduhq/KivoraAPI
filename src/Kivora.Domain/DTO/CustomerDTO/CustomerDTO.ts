import { Expose, Type } from 'class-transformer'
import UserDTO from '../UserDTO/UserDTO'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          CustomerDTO:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  user:
 *                      $ref: '#/components/schemas/UserDTO'
 */
export default class CustomerDTO {
    @Expose()
    id!: number

    @Expose()
    @Type(() => UserDTO)
    user!: UserDTO
}
