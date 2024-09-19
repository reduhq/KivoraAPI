import Business from '@Kivora.Domain/Entities/Business'
import IRepository from './IRepository'
import BusinessCreateDTO from '@Kivora.Domain/DTO/BusinessDTO/BusinessCreateDTO'
import BusinessUpdateDTO from '@Kivora.Domain/DTO/BusinessDTO/BusinessUpdateDTO'

export default interface IBusinessRepository
    extends IRepository<Business, BusinessCreateDTO, BusinessUpdateDTO> {
    GetById(_id: number): Promise<Business>
    GetActiveBusiness(): Promise<Array<Business>>
    ActivateBusiness(_id: number): Promise<boolean>
    GetByBusinessman(_id: number): Promise<Business[]>
}
