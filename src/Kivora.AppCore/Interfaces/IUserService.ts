import User from '../../Kivora.Domain/Entities/User'
import UserCreateDTO from '../../Kivora.Domain/DTO/UserDTO/UserCreateDTO'
import UserUpdateDTO from '../../Kivora.Domain/DTO/UserDTO/UserUpdateDTO'
import IService from './IService'

export default interface IUserService
    extends IService<User, UserCreateDTO, UserUpdateDTO> {
    GetByUsername(username: string): Promise<User>
    GetByEmail(email: string): Promise<User | null>
    GetById(id: number): Promise<User>
    UpdateProfilePicture(userId: number, url: string): Promise<boolean>
    ActivateUser(id: number): Promise<User>
    GetUserByToken(token: string): Promise<User | null>
    Authenticate(username: string, password: string): Promise<User | null>
}
