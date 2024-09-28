import Customer from '@Kivora.Domain/Entities/Customer'
import IRepository from './IRepository'
import CustomerCreateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerCreateDTO'
import CustomerUpdateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerUpdateDTO'

export default interface ICustomerRepository
    extends IRepository<Customer, CustomerCreateDTO, CustomerUpdateDTO> {
    GetById(id: number): Promise<Customer | null>
}
