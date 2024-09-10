import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
 */
export default class UserDTO{
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    id:number = 0

    @Expose()
    @IsString()
    @IsNotEmpty()
    username:string = ''
}