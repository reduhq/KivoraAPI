import { inject, injectable } from 'inversify'
import User from '../../Kivora.Domain/Entities/User'
import IUserRepository from '../../Kivora.Domain/Interfaces/IUserRepository'
import IUserService from '../Interfaces/IUserService'
import UserCreateDTO from '../DTO/UserDTO/UserCreateDTO'
import UserUpdateDTO from '../DTO/UserDTO/UserUpdateDTO'
import Security from '../utils/Security'
import { ROLE } from '@Kivora.Domain/Enums/ROLE'

@injectable()
export default class UserService implements IUserService {
    private userRepository: IUserRepository

    constructor(@inject('IUserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    public async ActivateUser(id: number): Promise<User> {
        return await this.userRepository.ActivateUser(id)
    }

    public async GetById(id: number): Promise<User> {
        return await this.userRepository.GetById(id)
    }

    public async Authenticate(
        username: string,
        password: string
    ): Promise<User | null> {
        const user = await this.userRepository.GetByUsername(username)
        if (!user) {
            return null
        }
        // Validating the password
        const validPassword = await Security.ValidatePassword(
            password,
            user.password
        )
        if (!validPassword) {
            return null
        }
        return user
    }
    public async GetByUsername(username: string): Promise<User> {
        return await this.userRepository.GetByUsername(username)
    }
    public async GetByEmail(email: string): Promise<User | null> {
        return await this.userRepository.GetByEmail(email)
    }
    public async GetUserByToken(token: string): Promise<User | null> {
        return await this.userRepository.GetUserByToken(token)
    }
    public async Create(t: UserCreateDTO, role?: ROLE): Promise<User> {
        t.password = await Security.HashPassword(t.password)
        return await this.userRepository.Create(t, role)
    }
    public async Update(id: number, t: UserUpdateDTO): Promise<User> {
        return await this.userRepository.Update(id, t)
    }
    public async Delete(id: number): Promise<boolean> {
        return await this.userRepository.Delete(id)
    }
    public async GetAll(): Promise<User[]> {
        return await this.userRepository.GetAll()
    }
}
