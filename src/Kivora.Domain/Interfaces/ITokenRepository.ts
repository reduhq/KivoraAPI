import ITokenCreateDTO from '@Kivora.AppCore/DTO/TokenDTO/TokenCreateDTO';
import { Token } from '@prisma/client';

export default interface ITokenRepository {
  Create(token: ITokenCreateDTO): Promise<Token>;
  FindByToken(token: string): Promise<Token | null>;
  Delete(token: string): Promise<void>;
  DeleteByUserId(userId: number): Promise<void>;
}
