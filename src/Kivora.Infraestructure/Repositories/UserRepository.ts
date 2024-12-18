import { PrismaClient } from '@prisma/client'
import User from '../../Kivora.Domain/Entities/User'
import IUserRepository from '../../Kivora.Domain/Interfaces/IUserRepository'
import { KivoraContext } from '../../Kivora.Domain/KivoraContext'
import { injectable } from 'inversify'
import { plainToInstance } from 'class-transformer'
import UserCreateDTO from '../../Kivora.Domain/DTO/UserDTO/UserCreateDTO'
import UserUpdateDTO from '../../Kivora.Domain/DTO/UserDTO/UserUpdateDTO'
import { ROLE } from '@Kivora.Domain/Enums/ROLE'
import { randomUUID } from 'crypto'

@injectable()
export default class UserRepository implements IUserRepository {
    private context: PrismaClient

    constructor() {
        this.context = KivoraContext
    }

    public async UpdateProfilePicture(
        userId: number,
        url: string
    ): Promise<boolean> {
        await this.context.user.update({
            data: {
                profilePicture: url
            },
            where: {
                id: userId.toString()
            }
        })
        return true
    }

    public async ActivateUser(id: number): Promise<User> {
        const user = await this.context.user.update({
            where: {
                id: id.toString()
            },
            data: {
                confirmed: true
            }
        })
        return plainToInstance(User, user)
    }

    public async GetById(id: number): Promise<User> {
        const user = await this.context.user.findFirst({
            where: {
                id: id.toString()
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

    public async Update(_id: number, _t: UserUpdateDTO): Promise<User> {
        if (!_id) {
            throw new Error('ID is required for updating the user')
        }

        const updatedUser = await this.context.user.update({
            where: {
                id: _id.toString() // Usamos el ID para encontrar el usuario
            },
            data: _t
        })

        return plainToInstance(User, updatedUser) // Convertir el resultado a instancia de User
    }

    public async Create(t: UserCreateDTO, role?: ROLE): Promise<User> {
        const userResponse = await this.context.user.create({
            data: {
                id: randomUUID(),
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
