import Client from '@Kivora.Domain/Entities/Client'
import IService from './IService'
import ClientCreateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientCreateDTO'
import ClientUpdateDTO from '@Kivora.Domain/DTO/ClientDTO/ClientUpdateDTO'

export default interface IClientService
    extends IService<Client, ClientCreateDTO, ClientUpdateDTO> {
    GetById(id: number): Promise<Client | null>
}
