import ICustomerService from '@Kivora.AppCore/Interfaces/ICustomerService'
import Security from '@Kivora.AppCore/utils/Security'
import CustomerCreateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerCreateDTO'
import CustomerUpdateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerUpdateDTO'
import Customer from '@Kivora.Domain/Entities/Customer'
import ICustomerRepository from '@Kivora.Domain/Interfaces/ICustomerRepository'
import { inject, injectable } from 'inversify'

@injectable()
export default class CustomerService implements ICustomerService {
    private readonly clientRepository: ICustomerRepository
    constructor(
        @inject('ICustomerRepository') clientRepository: ICustomerRepository
    ) {
        this.clientRepository = clientRepository
    }

    public async GetById(id: number): Promise<Customer | null> {
        return await this.clientRepository.GetById(id)
    }

    public async Create(t: CustomerCreateDTO): Promise<Customer> {
        t.user.password = await Security.HashPassword(t.user.password)
        return await this.clientRepository.Create(t)
    }
    Update(_id: number, _t: CustomerUpdateDTO): Promise<Customer | null> {
        throw new Error('Method not implemented.')
    }
    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    public async GetAll(): Promise<Customer[]> {
        return await this.clientRepository.GetAll()
    }
}
