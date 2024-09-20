import Client from '@Kivora.Domain/Entities/Client'
import IRepository from './IRepository'
import ClientCreateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientCreateDTO'
import ClientUpdateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientUpdateDTO'

export default interface IClientRepository
    extends IRepository<Client, ClientCreateDTO, ClientUpdateDTO> {
    GetById(id: number): Promise<Client | null>
}
