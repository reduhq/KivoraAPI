import { ROLE } from '@Kivora.Domain/Enums/ROLE'
import { Expose } from 'class-transformer'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          UserDTO:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  username:
 *                      type: string
 *                      example: reduhq
 *                  email:
 *                      type: string
 *                      example: reduhq@gmail.com
 *                  name:
 *                      type: string
 *                      example: Rey Halsall
 *                  profilePicture:
 *                      type: string
 *                      example: https://example/picture
 *                  phone:
 *                      type: string
 *                      example: 77574185
 *                  role:
 *                      type: string
 *                      enum: [ADMIN, CLIENT, BUSINESSMAN]
 *                  createdAt:
 *                      type: string
 *                      example: '2024-08-18T22:39:54.335Z'
 */
export default class UserDTO {
    @Expose()
    id: number = 0

    @Expose()
    username: string = ''

    @Expose()
    email: string = ''

    @Expose()
    name: string = ''

    @Expose()
    profilePicture: string = ''

    @Expose()
    phone: string = ''

    @Expose()
    role: ROLE = ROLE.CLIENT

    @Expose()
    createdAt: string = ''
}
