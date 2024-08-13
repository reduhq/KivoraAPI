import { Container } from "inversify";
import IUserRepository from "../Kivora.Domain/Interfaces/IUserRepository";
import UserRepository from "../Kivora.Infraestructure/Repositories/UserRepository";
import IUserService from "../Kivora.AppCore/Interfaces/IUserService";
import UserService from "../Kivora.AppCore/Services/UserService";
import IBusinessmanRepository from "../Kivora.Domain/Interfaces/IBusinessmanRepository";
import BusinessmanRepository from "../Kivora.Infraestructure/Repositories/BusinessmanRepository";
import IBusinessmanService from "../Kivora.AppCore/Interfaces/IBusinessmanService";
import BusinessmanService from "../Kivora.AppCore/Services/BusinessmanService";

const container = new Container()
container.bind<IUserRepository>('IUserRepository').to(UserRepository)
container.bind<IUserService>('IUserService').to(UserService)
container.bind<IBusinessmanRepository>('IBusinessmanRepository').to(BusinessmanRepository)
container.bind<IBusinessmanService>('IBusinessmanService').to(BusinessmanService)

export {container}