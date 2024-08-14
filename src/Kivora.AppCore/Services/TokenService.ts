import ITokenService from '@Kivora.AppCore/Interfaces/ITokenService';
import ITokenRepository from '@Kivora.Domain/Interfaces/ITokenRepository';
import { Token } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
export default class TokenService implements ITokenService {
  private tokenRepository: ITokenRepository;

  constructor(@inject('ITokenRepository') tokenRepository: ITokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  public async GenerateToken(userId: number): Promise<Token> {
    const tokenValue = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Expira en 10 minutos

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
