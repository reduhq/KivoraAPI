import { Container } from 'inversify'
import IUserRepository from '../Kivora.Domain/Interfaces/IUserRepository'
import UserRepository from '../Kivora.Infraestructure/Repositories/UserRepository'
import IUserService from '../Kivora.AppCore/Interfaces/IUserService'
import UserService from '../Kivora.AppCore/Services/UserService'
import IBusinessmanRepository from '../Kivora.Domain/Interfaces/IBusinessmanRepository'
import BusinessmanRepository from '../Kivora.Infraestructure/Repositories/BusinessmanRepository'
import IBusinessmanService from '../Kivora.AppCore/Interfaces/IBusinessmanService'
import BusinessmanService from '../Kivora.AppCore/Services/BusinessmanService'
import ITokenService from '@Kivora.AppCore/Interfaces/ITokenService'
import TokenService from '@Kivora.AppCore/Services/TokenService'
import ITokenRepository from '@Kivora.Domain/Interfaces/ITokenRepository'
import TokenRepository from '@Kivora.Infraestructure/Repositories/TokenRepository'
import IImageUploadProvider from '@Kivora.Domain/Interfaces/Providers/IImageUploadProvider'
import CloudinaryProvider from '@Kivora.Infraestructure/Providers/CloudinaryProvider'
import IProductService from '@Kivora.AppCore/Interfaces/IProductService'
import ProductService from '@Kivora.AppCore/Services/ProductService'
import IProductRepository from '@Kivora.Domain/Interfaces/IProductRepository'
import ProductRepository from '@Kivora.Infraestructure/Repositories/ProductRepository'
import INodemailerProvider from '@Kivora.Domain/Interfaces/Providers/INodemailerProvider'
import NodemailerProvider from '@Kivora.Infraestructure/Providers/NodemailerProvider'
import ICustomerRepository from '@Kivora.Domain/Interfaces/ICustomerRepository'
import CustomerRepository from '@Kivora.Infraestructure/Repositories/CustomerRepository'
import ICustomerService from '@Kivora.AppCore/Interfaces/ICustomerService'
import CustomerService from '@Kivora.AppCore/Services/CustomerService'

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
// Token
container.bind<ITokenService>('ITokenService').to(TokenService)
container.bind<ITokenRepository>('ITokenRepository').to(TokenRepository)
// Email
container
    .bind<INodemailerProvider>('INodemailerProvider')
    .to(NodemailerProvider)
// Image upload provider (CLOUDINARY)
container
    .bind<IImageUploadProvider>('IImageUploadProvider')
    .to(CloudinaryProvider)
// Product
container.bind<IProductService>('IProductService').to(ProductService)
container.bind<IProductRepository>('IProductRepository').to(ProductRepository)
// Customer
container
    .bind<ICustomerRepository>('ICustomerRepository')
    .to(CustomerRepository)
container.bind<ICustomerService>('ICustomerService').to(CustomerService)

export { container }
