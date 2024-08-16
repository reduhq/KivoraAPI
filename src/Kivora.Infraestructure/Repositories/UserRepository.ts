import { PrismaClient } from '@prisma/client'
import User from '../../Kivora.Domain/Entities/User'
import IUserRepository from '../../Kivora.Domain/Interfaces/IUserRepository'
import { KivoraContext } from '../../Kivora.Domain/KivoraContext'
import { injectable } from 'inversify'
import { plainToInstance } from 'class-transformer'
import UserCreateDTO from '../../Kivora.AppCore/DTO/UserDTO/UserCreateDTO'
import UserUpdateDTO from '../../Kivora.AppCore/DTO/UserDTO/UserUpdateDTO'
import { ROLE } from '@Kivora.Domain/Enums/ROLE'

@injectable()
export default class UserRepository implements IUserRepository {
    private context: PrismaClient

    constructor() {
        this.context = KivoraContext
    }

    public async GetById(id: number): Promise<User> {
        const user = await this.context.user.findFirst({
            where: {
                id
            }
        })
        return plainToInstance(User, user)
    }

    public async GetByEmail(email: string): Promise<User | null> {
        const user = await this.context.user.findFirst({
            where: {
                email
            }
        })
        return plainToInstance(User, user)
    }

    public async GetByUsername(username: string): Promise<User> {
        const user = await this.context.user.findFirst({
            where: {
                username
            }
        })
        return plainToInstance(User, user)
    }
    public async GetUserByToken(token: string): Promise<User | null> {
        const user = await this.context.user.findFirst({
            where: {
                token: {
                    token: token
                }
            },
            include: {
                token: true
            }
        })

        return user ? plainToInstance(User, user) : null
    }
    public async Update(_t: UserUpdateDTO): Promise<User> {
        if (!_t.id) {
            throw new Error('ID is required for updating the user')
        }

        const updatedUser = await this.context.user.update({
            where: {
                id: _t.id // Usamos el ID para encontrar el usuario
            },
            data: {
                username: _t.username,
                email: _t.email,
                password: _t.password,
                name: _t.name,
                profilePicture: _t.profilePicture,
                phone: _t.phone,
                confirmed: _t.confirmed,
                role: _t.role
            }
        })

        return plainToInstance(User, updatedUser) // Convertir el resultado a instancia de User
    }

    public async Create(t: UserCreateDTO, role?: ROLE): Promise<User> {
        const userResponse = await this.context.user.create({
            data: {
                username: t.username,
                password: t.password,
                email: t.email,
                name: t.name,
                role: role ?? ROLE.ADMIN
            }
        })
        return plainToInstance(User, userResponse)
    }

    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    public async GetAll(): Promise<User[]> {
        const usersResponse = await this.context.user.findMany()
        return plainToInstance(User, usersResponse)
    }
}
