import { inject, injectable } from 'inversify'
import Businessman from '../../Kivora.Domain/Entities/Businessman'
import BusinessmanCreateDTO from '../../Kivora.Domain/DTO/BusinessmanDTO/BusinessmanCreateDTO'
import BusinessmanUpdateDTO from '../../Kivora.Domain/DTO/BusinessmanDTO/BusinessmanUpdateDTO'
import IBusinessmanService from '../Interfaces/IBusinessmanService'
import IBusinessmanRepository from '../../Kivora.Domain/Interfaces/IBusinessmanRepository'
import Security from '@Kivora.AppCore/utils/Security'

@injectable()
export default class BusinessmanService implements IBusinessmanService {
    private businessmanRepository: IBusinessmanRepository

    constructor(
        @inject('IBusinessmanRepository')
        businessmanRepository: IBusinessmanRepository
    ) {
        this.businessmanRepository = businessmanRepository
    }
    public async GetById(id: number): Promise<Businessman | null> {
        return await this.businessmanRepository.GetById(id)
    }

    public async Create(t: BusinessmanCreateDTO): Promise<Businessman> {
        t.user.password = await Security.HashPassword(t.user.password)
        return await this.businessmanRepository.Create(t)
    }

    public async Update(
        id: number,
        t: BusinessmanUpdateDTO
    ): Promise<Businessman> {
        return await this.businessmanRepository.Update(id, t)
    }

    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    GetAll(): Promise<Businessman[]> {
        throw new Error('Method not implemented.')
    }
}
