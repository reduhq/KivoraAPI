import { PrismaClient } from '@prisma/client'
import User from '../../Kivora.Domain/Entities/User'
import IUserRepository from '../../Kivora.Domain/Interfaces/IUserRepository'
import { KivoraContext } from '../../Kivora.Domain/KivoraContext'
import { injectable } from 'inversify'
import { plainToInstance } from 'class-transformer'
import UserCreateDTO from '../../Kivora.AppCore/DTO/UserDTO/UserCreateDTO'
import UserUpdateDTO from '../../Kivora.AppCore/DTO/UserDTO/UserUpdateDTO'

@injectable()
export default class UserRepository implements IUserRepository {
    private context: PrismaClient

    constructor() {
        this.context = KivoraContext
    }
    public async GetByUsername(username: string): Promise<User> {
        const user = await this.context.user.findFirst({
            where: {
                username
            }
        })
        return plainToInstance(User, user)
    }
    public async Create(t: UserCreateDTO): Promise<User> {
        const userResponse = await this.context.user.create({
            data: {
                username: t.username,
                password: t.password,
                email: t.email,
                name: t.name,
                role: 'ADMIN'
            }
        })
        return plainToInstance(User, userResponse)
    }
    Update(_t: UserUpdateDTO): Promise<User> {
        throw new Error('Method not implemented.')
    }
    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    public async GetAll(): Promise<User[]> {
        const usersResponse = await this.context.user.findMany()
        return plainToInstance(User, usersResponse)
    }
}
