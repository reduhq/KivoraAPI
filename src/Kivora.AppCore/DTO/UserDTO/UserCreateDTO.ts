import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { IsPasswordMatch } from "../../utils/IsPasswordMatch";

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
export default class UserCreateDTO {
  @Expose()
  @IsString()
  @IsNotEmpty({ message: "El username no puede estar vacio" })
  username: string = "";

  @Expose()
  @IsString()
  @IsNotEmpty({ message: "La contraseña no puede estar vacia" })
  @MinLength(8, { message: "La contraseña es muy corta" })
  password: string = "";

  @Expose()
  @IsString()
  @IsNotEmpty({ message: "La confirmación de contraseña no puede estar vacía" })
  @MinLength(8, { message: "La confirmación de la contraseña es muy corta" })
  @IsPasswordMatch("password", { message: "Las contraseñas no coinciden" })
  passwordConfirmation: string = "";

  @Expose()
  @IsEmail()
  @IsNotEmpty({ message: "El Email no puede estar vacio" })
  email: string = "";

  @Expose()
  @IsString({ message: "El nombre no puede estar vacio" })
  @IsNotEmpty({ message: "El nombre no puede estar vacio" })
  name: string = "";
}
