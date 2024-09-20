import IClientService from '@Kivora.AppCore/Interfaces/IClientService'
import settings from '@Kivora.Infraestructure/Settings'
import { inject } from 'inversify'
import { controller, httpGet } from 'inversify-express-utils'
import { Request, Response } from 'express'
import { plainToInstance } from 'class-transformer'
import ClientDTO from '@Kivora.Domain/DTO/ClientDTO/ClientDTO'

@controller(`${settings.API_V1_STR}/client`)
export default class ClientController {
    private readonly clientService: IClientService
    constructor(@inject('IClientService') clientService: IClientService) {
        this.clientService = clientService
    }

    @httpGet('/')
    public async GetAll(_req: Request, res: Response): Promise<Response> {
        const clients = await this.clientService.GetAll()
        // response
        const response = plainToInstance(ClientDTO, clients, {
            excludeExtraneousValues: true
        })
        return res.status(200).json(response)
    }
}
