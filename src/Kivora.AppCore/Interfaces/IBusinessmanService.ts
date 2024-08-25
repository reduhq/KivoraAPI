import Businessman from '../../Kivora.Domain/Entities/Businessman'
import BusinessmanCreateDTO from '../../Kivora.Domain/DTO/BusinessmanDTO/BusinessmanCreateDTO'
import BusinessmanUpdateDTO from '../../Kivora.Domain/DTO/BusinessmanDTO/BusinessmanUpdateDTO'
import IService from './IService'

export default interface IBusinessmanService
    extends IService<Businessman, BusinessmanCreateDTO, BusinessmanUpdateDTO> {
    GetById(id: number): Promise<Businessman | null>
}
