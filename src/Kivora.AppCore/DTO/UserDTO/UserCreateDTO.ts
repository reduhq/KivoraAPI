import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

/**
 *  @swagger
 *  components:
 *      schemas:
 *          UserCreateDTO:
 *              type: object
 *              properties:
 *                  username: 
 *                      type: string
 *                      example: reduhq
 *                  password: 
 *                      type: string
 *                      example: 12345678
 */
export default class UserCreateDTO{
    @Expose()
    @IsString()
    @IsNotEmpty({message:"El username no puede estar vacio"})
    username:string = ''

    @Expose()
    @IsString()
    @IsNotEmpty({message:"La contraseña no puede estar vacia"})
    @MinLength(8, {message:"La contraseña es muy corta"})
    password:string = ''
}