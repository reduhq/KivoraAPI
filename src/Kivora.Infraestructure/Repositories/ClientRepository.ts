import ClientCreateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientCreateDTO'
import ClientUpdateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientUpdateDTO'
import Client from '@Kivora.Domain/Entities/Client'
import IClientRepository from '@Kivora.Domain/Interfaces/IClientRepository'
import { KivoraContext } from '@Kivora.Domain/KivoraContext'
import { PrismaClient } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { inject, injectable } from 'inversify'
import { ROLE } from '@Kivora.Domain/Enums/ROLE'
import User from '@Kivora.Domain/Entities/User'
import IUserRepository from '@Kivora.Domain/Interfaces/IUserRepository'

@injectable()
export default class ClientRepository implements IClientRepository {
    private readonly context: PrismaClient
    private readonly userRepository: IUserRepository
    constructor(@inject('IUserRepository') userRepository: IUserRepository) {
        this.context = KivoraContext
        this.userRepository = userRepository
    }

    public async Create(t: ClientCreateDTO): Promise<Client> {
        // Creating a new user
        const user: User = await this.userRepository.Create(t.user, ROLE.CLIENT)
        // Creating a new client
        const client = await this.context.client.create({
            data: {
                id: user.id
            },
            select: {
                id: true,
                user: true
            }
        })
        return plainToInstance(Client, client, {
            excludeExtraneousValues: true
        })
    }
    Update(_id: number, _t: ClientUpdateDTO): Promise<Client> {
        throw new Error('Method not implemented.')
    }
    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    public async GetAll(): Promise<Client[]> {
        const clients = await this.context.client.findMany({
            select: {
                id: true,
                user: true
            }
        })
        return plainToInstance(Client, clients, {
            excludeExtraneousValues: true
        })
    }
}
