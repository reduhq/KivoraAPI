import ITokenService from '../../Kivora.AppCore/Interfaces/ITokenService';
import { GenerateToken } from '../../Kivora.AppCore/utils/GenerateToken';
import ITokenRepository from '../../Kivora.Domain/Interfaces/ITokenRepository';
import { Token } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
export default class TokenService implements ITokenService {
  private tokenRepository: ITokenRepository;

  constructor(@inject('ITokenRepository') tokenRepository: ITokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  public async GenerateToken(userId: number): Promise<Token> {
    // Generar un nuevo token
    const tokenValue = GenerateToken(); // Utiliza la función que has definido
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expira en 10 minutos

    // Eliminar el token existente para el usuario (si existe)
    await this.tokenRepository.DeleteByUserId(userId);

    // Crear y devolver el nuevo token
    const token = await this.tokenRepository.Create({
      token: tokenValue,
      userId,
      expiresAt
    });

    return token;
  }

  public async ValidateToken(token: string): Promise<boolean> {
    const tokenRecord = await this.tokenRepository.FindByToken(token);
    if (!tokenRecord) return false;

    // Check if token is expired
    if (tokenRecord.expiresAt < new Date()) {
      await this.tokenRepository.Delete(token);
      return false;
    }

    return true;
  }

  public async InvalidateToken(token: string): Promise<void> {
    await this.tokenRepository.Delete(token);
  }
}
