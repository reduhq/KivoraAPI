import BusinessCreateDTO from '@Kivora.Domain/DTO/BusinessDTO/BusinessCreateDTO'
import BusinessUpdateDTO from '@Kivora.Domain/DTO/BusinessDTO/BusinessUpdateDTO'
import IBusinessService from '@Kivora.AppCore/Interfaces/IBusinessService'
import Business from '@Kivora.Domain/Entities/Business'
import IBusinessRepository from '@Kivora.Domain/Interfaces/IBusinessRepository'
import { inject, injectable } from 'inversify'

@injectable()
export default class BusinessService implements IBusinessService {
    private businessRespository: IBusinessRepository

    constructor(
        @inject('IBusinessRepository') businessRepository: IBusinessRepository
    ) {
        this.businessRespository = businessRepository
    }
    public async ActivateBusiness(_id: number): Promise<boolean> {
        const business = await this.businessRespository.GetById(_id)
        if (!business) return false
        // habilitando negocio
        return await this.businessRespository.ActivateBusiness(_id)
    }
    public async GetById(_id: number): Promise<Business | null> {
        const business = await this.businessRespository.GetById(_id)
        if (!business) return null
        // desabilitando negocio
        return business
    }
    public async Create(_t: BusinessCreateDTO): Promise<Business> {
        return await this.businessRespository.Create(_t)
    }
    public async Update(
        _id: number,
        _t: BusinessUpdateDTO
    ): Promise<Business | null> {
        const business = await this.businessRespository.GetById(_id)
        if (!business) return null
        return await this.businessRespository.Update(_id, _t)
    }
    public async Delete(_id: number): Promise<boolean> {
        const business = await this.businessRespository.GetById(_id)
        if (!business) return false
        // desabilitando negocio
        return await this.businessRespository.Delete(_id)
    }
    public async GetAll(): Promise<Business[]> {
        return await this.businessRespository.GetActiveBusiness()
    }
}
