import Customer from '@Kivora.Domain/Entities/Customer'
import IService from './IService'
import CustomerCreateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerCreateDTO'
import CustomerUpdateDTO from '@Kivora.Domain/DTO/CustomerDTO/CustomerUpdateDTO'

export default interface ICustomerService
    extends IService<Customer, CustomerCreateDTO, CustomerUpdateDTO> {
    GetById(id: number): Promise<Customer | null>
}
