import { ROLE } from '@Kivora.Domain/Enums/ROLE'
import UserCreateDTO from '../DTO/UserDTO/UserCreateDTO'
import UserUpdateDTO from '../DTO/UserDTO/UserUpdateDTO'
import User from '../Entities/User'
import IRepository from './IRepository'

export default interface IUserRepository
    extends IRepository<User, UserCreateDTO, UserUpdateDTO> {
    Create(_t: UserCreateDTO, role?: ROLE): Promise<User>
    GetByUsername(username: string): Promise<User>
    GetByEmail(email: string): Promise<User | null>
    GetById(id: number): Promise<User>
    UpdateProfilePicture(userId: number, url: string): Promise<boolean>
    ActivateUser(id: number): Promise<User>
}
