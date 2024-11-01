import { PrismaClient } from '@prisma/client'
import BusinessmanCreateDTO from '../../Kivora.Domain/DTO/BusinessmanDTO/BusinessmanCreateDTO'
import BusinessmanUpdateDTO from '../../Kivora.Domain/DTO/BusinessmanDTO/BusinessmanUpdateDTO'
import Businessman from '../../Kivora.Domain/Entities/Businessman'
import IBusinessmanRepository from '../../Kivora.Domain/Interfaces/IBusinessmanRepository'
import { KivoraContext } from '../../Kivora.Domain/KivoraContext'
import IUserRepository from '@Kivora.Domain/Interfaces/IUserRepository'
import { inject, injectable } from 'inversify'
import { plainToInstance } from 'class-transformer'
import User from '@Kivora.Domain/Entities/User'
import UserCreateDTO from '@Kivora.Domain/DTO/UserDTO/UserCreateDTO'
import { ROLE } from '@Kivora.Domain/Enums/ROLE'

@injectable()
export default class BusinessmanRepository implements IBusinessmanRepository {
    private context: PrismaClient
    private userRepository: IUserRepository

    constructor(@inject('IUserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository
        this.context = KivoraContext
    }

    public async GetById(id: number): Promise<Businessman | null> {
        const businessman = await this.context.businessman.findFirst({
            select: {
                id: true,
                user: true
            },
            where: {
                id: id.toString()
            }
        })
        if (!businessman) return null
        return plainToInstance(Businessman, businessman, {
            excludeExtraneousValues: true
        })
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
        return plainToInstance(Businessman, businessmanCreate, {
            excludeExtraneousValues: true
        })
    }

    public async Update(
        id: number,
        t: BusinessmanUpdateDTO
    ): Promise<Businessman> {
        const businessman = await this.context.businessman.update({
            select: {
                id: true,
                user: true
            },
            data: {
                user: {
                    update: t.user
                }
            },
            where: {
                id: id.toString()
            }
        })
        return plainToInstance(Businessman, businessman, {
            excludeExtraneousValues: true
        })
    }

    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    public async GetAll(): Promise<Businessman[]> {
        throw new Error('Method not implemented.')
    }
}
