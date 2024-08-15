import { Container } from "inversify";
import IUserRepository from "../Kivora.Domain/Interfaces/IUserRepository";
import UserRepository from "../Kivora.Infraestructure/Repositories/UserRepository";
import IUserService from "../Kivora.AppCore/Interfaces/IUserService";
import UserService from "../Kivora.AppCore/Services/UserService";
import { EmailService } from "../Kivora.AppCore/Services/EmailService";
import { IEmailService } from "../Kivora.AppCore/Interfaces/IEmailService";
import ITokenRepository from "../Kivora.Domain/Interfaces/ITokenRepository";
import ITokenService from "../Kivora.AppCore/Interfaces/ITokenService";
import TokenRepository from "../Kivora.Infraestructure/Repositories/TokenRepository";
import TokenService from "../Kivora.AppCore/Services/TokenService";

const container = new Container();
container.bind<IUserRepository>("IUserRepository").to(UserRepository);
container.bind<IUserService>("IUserService").to(UserService);
container.bind<IEmailService>("IEmailService").to(EmailService);
container.bind<ITokenRepository>("ITokenRepository").to(TokenRepository);
container.bind<ITokenService>("ITokenService").to(TokenService);

export { container };
