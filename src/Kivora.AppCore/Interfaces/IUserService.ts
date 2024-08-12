import User from "../../Kivora.Domain/Entities/User";
import UserCreateDTO from "../DTO/UserDTO/UserCreateDTO";
import UserUpdateDTO from "../DTO/UserDTO/UserUpdateDTO";
import IService from "./IService";

export default interface IUserService extends IService<User, UserCreateDTO, UserUpdateDTO>{
    GetByUsername(username:string): Promise<User>
    Authenticate(username:string, password:string): Promise<User|null>
}