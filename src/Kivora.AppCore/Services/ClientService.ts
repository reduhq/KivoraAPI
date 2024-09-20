import IClientService from '@Kivora.AppCore/Interfaces/IClientService'
import Security from '@Kivora.AppCore/utils/Security'
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

    public async GetById(id: number): Promise<Client | null> {
        return await this.clientRepository.GetById(id)
    }

    public async Create(t: ClientCreateDTO): Promise<Client> {
        t.user.password = await Security.HashPassword(t.user.password)
        return await this.clientRepository.Create(t)
    }
    Update(_id: number, _t: ClientUpdateDTO): Promise<Client | null> {
        throw new Error('Method not implemented.')
    }
    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    public async GetAll(): Promise<Client[]> {
        return await this.clientRepository.GetAll()
    }
}
