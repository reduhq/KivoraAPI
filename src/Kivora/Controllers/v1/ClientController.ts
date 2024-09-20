import IClientService from '@Kivora.AppCore/Interfaces/IClientService'
import settings from '@Kivora.Infraestructure/Settings'
import { inject } from 'inversify'
import { controller, httpGet } from 'inversify-express-utils'
import { Request, Response } from 'express'

@controller(`${settings.API_V1_STR}/client`)
export default class ClientController {
    private readonly clientService: IClientService
    constructor(@inject('IClientService') clientService: IClientService) {
        this.clientService = clientService
    }

    @httpGet('/')
    public GetAll(_req: Request, res: Response) {
        return res.status(200).json('siuuuuu')
    }
}
