import CustomerCreateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerCreateDTO'
import CustomerUpdateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerUpdateDTO'
import Customer from '@Kivora.Domain/Entities/Customer'
import IClientRepository from '@Kivora.Domain/Interfaces/ICustomerRepository'
import { KivoraContext } from '@Kivora.Domain/KivoraContext'
import { PrismaClient } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { inject, injectable } from 'inversify'
import { ROLE } from '@Kivora.Domain/Enums/ROLE'
import User from '@Kivora.Domain/Entities/User'
import IUserRepository from '@Kivora.Domain/Interfaces/IUserRepository'

@injectable()
export default class CustomerRepository implements IClientRepository {
    private readonly context: PrismaClient
    private readonly userRepository: IUserRepository
    constructor(@inject('IUserRepository') userRepository: IUserRepository) {
        this.context = KivoraContext
        this.userRepository = userRepository
    }

    public async GetById(id: number): Promise<Customer | null> {
        const customer = await this.context.customer.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                user: true
            }
        })
        if (!customer) return null
        return plainToInstance(Customer, customer, {
            excludeExtraneousValues: true
        })
    }

    public async Create(t: CustomerCreateDTO): Promise<Customer> {
        // Creating a new user
        const user: User = await this.userRepository.Create(t.user, ROLE.CLIENT)
        // Creating a new customer
        const customer = await this.context.customer.create({
            data: {
                id: user.id
            },
            select: {
                id: true,
                user: true
            }
        })
        return plainToInstance(Customer, customer, {
            excludeExtraneousValues: true
        })
    }
    public async Update(id: number, t: CustomerUpdateDTO): Promise<Customer> {
        const customer = await this.context.customer.update({
            select: {
                id: true,
                user: true
            },
            data: {
                user: {
                    update: t.user
                }
            },
            where: { id }
        })
        return plainToInstance(Customer, customer, {
            excludeExtraneousValues: true
        })
    }
    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    public async GetAll(): Promise<Customer[]> {
        const clients = await this.context.customer.findMany({
            select: {
                id: true,
                user: true
            }
        })
        return plainToInstance(Customer, clients, {
            excludeExtraneousValues: true
        })
    }
}
