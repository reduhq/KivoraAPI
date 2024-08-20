import BusinessmanCreateDTO from '../../Kivora.AppCore/DTO/BusinessmanDTO/BusinessmanCreateDTO'
import BusinessmanUpdateDTO from '../../Kivora.AppCore/DTO/BusinessmanDTO/BusinessmanUpdateDTO'
import Businessman from '../../Kivora.Domain/Entities/Businessman'
import IRepository from './IRepository'

export default interface IBusinessmanRepository
    extends IRepository<
        Businessman,
        BusinessmanCreateDTO,
        BusinessmanUpdateDTO
    > {
    GetById(id: number): Promise<Businessman | null>
}
