import ClientCreateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientCreateDTO'
import ClientUpdateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientUpdateDTO'
import Client from '@Kivora.Domain/Entities/Client'
import IClientRepository from '@Kivora.Domain/Interfaces/IClientRepository'
import { KivoraContext } from '@Kivora.Domain/KivoraContext'
import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'

@injectable()
export default class ClientRepository implements IClientRepository {
    private readonly context: PrismaClient
    constructor() {
        this.context = KivoraContext
    }

    Create(_t: ClientCreateDTO): Promise<Client> {
        throw new Error('Method not implemented.')
    }
    Update(_id: number, _t: ClientUpdateDTO): Promise<Client> {
        throw new Error('Method not implemented.')
    }
    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    GetAll(): Promise<Client[]> {
        throw new Error('Method not implemented.')
    }
}
