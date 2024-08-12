import { Container } from "inversify";
import IUserRepository from "../Kivora.Domain/Interfaces/IUserRepository";
import UserRepository from "../Kivora.Infraestructure/Repositories/UserRepository";
import IUserService from "../Kivora.AppCore/Interfaces/IUserService";
import UserService from "../Kivora.AppCore/Services/UserService";

const container = new Container()
container.bind<IUserRepository>('IUserRepository').to(UserRepository)
container.bind<IUserService>('IUserService').to(UserService)

export {container}