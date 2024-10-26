import { Container } from 'inversify'
import IUserRepository from '../Kivora.Domain/Interfaces/IUserRepository'
import UserRepository from '../Kivora.Infraestructure/Repositories/UserRepository'
import IUserService from '../Kivora.AppCore/Interfaces/IUserService'
import UserService from '../Kivora.AppCore/Services/UserService'
import IBusinessmanRepository from '../Kivora.Domain/Interfaces/IBusinessmanRepository'
import BusinessmanRepository from '../Kivora.Infraestructure/Repositories/BusinessmanRepository'
import IBusinessmanService from '../Kivora.AppCore/Interfaces/IBusinessmanService'
import BusinessmanService from '../Kivora.AppCore/Services/BusinessmanService'
import IImageUploadProvider from '@Kivora.Domain/Interfaces/Providers/IImageUploadProvider'
import CloudinaryProvider from '@Kivora.Infraestructure/Providers/CloudinaryProvider'
import IProductService from '@Kivora.AppCore/Interfaces/IProductService'
import ProductService from '@Kivora.AppCore/Services/ProductService'
import IProductRepository from '@Kivora.Domain/Interfaces/IProductRepository'
import ProductRepository from '@Kivora.Infraestructure/Repositories/ProductRepository'
import INodemailerProvider from '@Kivora.Domain/Interfaces/Providers/INodemailerProvider'
import NodemailerProvider from '@Kivora.Infraestructure/Providers/NodemailerProvider'
// import { EmailService } from '@Kivora.AppCore/Services/EmailService'
// import { IEmailService } from '@Kivora.AppCore/Interfaces/IEmailService'
import BusinessService from '@Kivora.AppCore/Services/BusinessService'
import IBusinessService from '@Kivora.AppCore/Interfaces/IBusinessService'
import IBusinessRepository from '@Kivora.Domain/Interfaces/IBusinessRepository'
import BusinessRepository from '@Kivora.Infraestructure/Repositories/BusinessRepository'
import ICustomerRepository from '@Kivora.Domain/Interfaces/ICustomerRepository'
import CustomerRepository from '@Kivora.Infraestructure/Repositories/CustomerRepository'
import ICustomerService from '@Kivora.AppCore/Interfaces/ICustomerService'
import CustomerService from '@Kivora.AppCore/Services/CustomerService'
import IEmailSenderProvider from '@Kivora.Domain/Interfaces/Providers/IEmailSenderProvider'
import EmailSenderProvider from '@Kivora.Infraestructure/Providers/EmailSenderProvider'
import ISearchService from '@Kivora.AppCore/Interfaces/ISearchService'
import SearchService from '@Kivora.AppCore/Services/SearchService'
import ISearchRepository from '@Kivora.Domain/Interfaces/ISearchRepository'
import SearchRepository from '@Kivora.Infraestructure/Repositories/SearchRepository'

const container = new Container()
// User
container.bind<IUserRepository>('IUserRepository').to(UserRepository)
container.bind<IUserService>('IUserService').to(UserService)
// Businessman
container
    .bind<IBusinessmanRepository>('IBusinessmanRepository')
    .to(BusinessmanRepository)
container
    .bind<IBusinessmanService>('IBusinessmanService')
    .to(BusinessmanService)
// Email DEPRECATED
container
    .bind<INodemailerProvider>('INodemailerProvider')
    .to(NodemailerProvider)
// Email Sender Provider
container
    .bind<IEmailSenderProvider>('IEmailSenderProvider')
    .to(EmailSenderProvider)
// Image upload provider (CLOUDINARY)
container
    .bind<IImageUploadProvider>('IImageUploadProvider')
    .to(CloudinaryProvider)
// Product
container.bind<IProductService>('IProductService').to(ProductService)
container.bind<IProductRepository>('IProductRepository').to(ProductRepository)
// container.bind<IEmailService>('IEmailService').to(EmailService)
//Business
container.bind<IBusinessService>('IBusinessService').to(BusinessService)
container
    .bind<IBusinessRepository>('IBusinessRepository')
    .to(BusinessRepository)
// Customer
container
    .bind<ICustomerRepository>('ICustomerRepository')
    .to(CustomerRepository)
container.bind<ICustomerService>('ICustomerService').to(CustomerService)
// Search STR
container.bind<ISearchService>('ISearchService').to(SearchService)
container.bind<ISearchRepository>('ISearchRepository').to(SearchRepository)

export { container }
