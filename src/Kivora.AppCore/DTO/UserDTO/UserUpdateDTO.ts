import { Type } from "class-transformer";

import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

export enum ROLE {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  BUSINESSMAN = "BUSINESSMAN",
}
/**
 *  @swagger
 *  components:
 *    schemas:
 *      UserUpdateDTO:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: ID del usuario (obligatorio para la actualización)
 *            example: 1
 *          username:
 *            type: string
 *            description: Nombre de usuario del usuario
 *            example: johndoe
 *          email:
 *            type: string
 *            description: Correo electrónico del usuario
 *            example: johndoe@example.com
 *          password:
 *            type: string
 *            description: Contraseña del usuario (aunque generalmente se maneja de manera diferente)
 *            example: newpassword123
 *          name:
 *            type: string
 *            description: Nombre completo del usuario
 *            example: John Doe
 *          profilePicture:
 *            type: string
 *            description: URL de la imagen de perfil del usuario
 *            example: http://example.com/profile.jpg
 *          phone:
 *            type: string
 *            description: Número de teléfono del usuario
 *            example: +1234567890
 *          confirmed:
 *            type: boolean
 *            description: Indica si la cuenta del usuario está confirmada
 *            example: true
 *          role:
 *            type: string
 *            enum: [ADMIN, CLIENT, BUSINESSMAN]
 *            description: Rol del usuario en el sistema
 *            example: ADMIN
 *        required:
 *          - id
 */ export default class UserUpdateDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  confirmed?: boolean;

  @IsOptional()
  @IsEnum(ROLE)
  role?: ROLE;
}
