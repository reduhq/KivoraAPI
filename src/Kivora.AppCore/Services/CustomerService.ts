import ICustomerService from '@Kivora.AppCore/Interfaces/ICustomerService'
import Security from '@Kivora.AppCore/utils/Security'
import CustomerCreateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerCreateDTO'
import CustomerUpdateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerUpdateDTO'
import Customer from '@Kivora.Domain/Entities/Customer'
import ICustomerRepository from '@Kivora.Domain/Interfaces/ICustomerRepository'
import { inject, injectable } from 'inversify'

@injectable()
export default class CustomerService implements ICustomerService {
    private readonly customerRepository: ICustomerRepository
    constructor(
        @inject('ICustomerRepository') customerRepository: ICustomerRepository
    ) {
        this.customerRepository = customerRepository
    }

    public async GetById(id: number): Promise<Customer | null> {
        return await this.customerRepository.GetById(id)
    }

    public async Create(t: CustomerCreateDTO): Promise<Customer> {
        t.user.password = await Security.HashPassword(t.user.password)
        return await this.customerRepository.Create(t)
    }

    public async Update(
        id: number,
        t: CustomerUpdateDTO
    ): Promise<Customer | null> {
        const customer = await this.customerRepository.GetById(id)
        if (!customer) return null
        return await this.customerRepository.Update(id, t)
    }
    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    public async GetAll(): Promise<Customer[]> {
        return await this.customerRepository.GetAll()
    }
}
