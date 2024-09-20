import { Expose, Type } from 'class-transformer'
import UserDTO from '../UserDTO/UserDTO'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          ClientDTO:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  user:
 *                      $ref: '#/components/schemas/UserDTO'
 */
export default class ClientDTO {
    @Expose()
    id!: number

    @Expose()
    @Type(() => UserDTO)
    user!: UserDTO
}
