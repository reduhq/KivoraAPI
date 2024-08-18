import { PrismaClient } from '@prisma/client'
import BusinessmanCreateDTO from '../../Kivora.AppCore/DTO/BusinessmanDTO/BusinessmanCreateDTO'
import BusinessmanUpdateDTO from '../../Kivora.AppCore/DTO/BusinessmanDTO/BusinessmanUpdateDTO'
import Businessman from '../../Kivora.Domain/Entities/Businessman'
import IBusinessmanRepository from '../../Kivora.Domain/Interfaces/IBusinessmanRepository'
import { KivoraContext } from '../../Kivora.Domain/KivoraContext'
import IUserRepository from '@Kivora.Domain/Interfaces/IUserRepository'
import { inject, injectable } from 'inversify'
import { plainToInstance } from 'class-transformer'
import User from '@Kivora.Domain/Entities/User'
import UserCreateDTO from '@Kivora.AppCore/DTO/UserDTO/UserCreateDTO'
import { ROLE } from '@Kivora.Domain/Enums/ROLE'

@injectable()
export default class BusinessmanRepository implements IBusinessmanRepository {
    private context: PrismaClient
    private userRepository: IUserRepository

    constructor(@inject('IUserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository
        this.context = KivoraContext
    }

    public async Create(t: BusinessmanCreateDTO): Promise<Businessman> {
        // Creating a new User
        const userCreate: User = await this.userRepository.Create(
            plainToInstance(UserCreateDTO, t.user),
            ROLE.BUSINESSMAN
        )
        //Creating a new Businessman
        const businessmanCreate = await this.context.businessman.create({
            data: {
                id: userCreate.id
            },
            select: {
                id: true,
                user: true
            }
        })
        const u = plainToInstance(Businessman, businessmanCreate, {
            excludeExtraneousValues: true
        })
        console.log(u.id)
        return plainToInstance(Businessman, businessmanCreate, {
            excludeExtraneousValues: true
        })
    }

    Update(_t: BusinessmanUpdateDTO): Promise<Businessman> {
        throw new Error('Method not implemented.')
    }

    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    public async GetAll(): Promise<Businessman[]> {
        throw new Error('Method not implemented.')
    }
}
