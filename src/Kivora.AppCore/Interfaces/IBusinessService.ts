import Business from '@Kivora.Domain/Entities/Business'
import IService from './IService'
import BusinessCreateDTO from '@Kivora.Domain/DTO/BusinessDTO/BusinessCreateDTO'
import BusinessUpdateDTO from '@Kivora.Domain/DTO/BusinessDTO/BusinessUpdateDTO'
export default interface IBusinessService
    extends IService<Business, BusinessCreateDTO, BusinessUpdateDTO> {
    GetById(_id: number): Promise<Business | null>
    ActivateBusiness(_id: number): Promise<boolean>
}
