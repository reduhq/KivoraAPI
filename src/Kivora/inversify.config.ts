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
import { EmailService } from '@Kivora.AppCore/Services/EmailService'
import { IEmailService } from '@Kivora.AppCore/Interfaces/IEmailService'

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
container.bind<IEmailService>('IEmailService').to(EmailService)

export { container }
