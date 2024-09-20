import IClientService from '@Kivora.AppCore/Interfaces/IClientService'
import ClientCreateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientCreateDTO'
import ClientUpdateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientUpdateDTO'
import Client from '@Kivora.Domain/Entities/Client'
import IClientRepository from '@Kivora.Domain/Interfaces/IClientRepository'
import { inject, injectable } from 'inversify'

@injectable()
export default class ClientService implements IClientService {
    private readonly clientRepository: IClientRepository
    constructor(
        @inject('IClientRepository') clientRepository: IClientRepository
    ) {
        this.clientRepository = clientRepository
    }

    Create(_t: ClientCreateDTO): Promise<Client> {
        throw new Error('Method not implemented.')
    }
    Update(_id: number, _t: ClientUpdateDTO): Promise<Client | null> {
        throw new Error('Method not implemented.')
    }
    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    GetAll(): Promise<Client[]> {
        throw new Error('Method not implemented.')
    }
}