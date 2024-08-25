import ITokenCreateDTO from '../../Kivora.Domain/DTO/TokenDTO/TokenCreateDTO'
import ITokenRepository from '../../Kivora.Domain/Interfaces/ITokenRepository'
import { PrismaClient, Token } from '@prisma/client'
import { injectable } from 'inversify'

@injectable()
export default class TokenRepository implements ITokenRepository {
    private context: PrismaClient

    constructor() {
        this.context = new PrismaClient()
    }

    public async Create(tokenData: ITokenCreateDTO): Promise<Token> {
        const token = await this.context.token.create({
            data: {
                token: tokenData.token,
                userId: tokenData.userId,
                expiresAt: tokenData.expiresAt
            }
        })
        return token
    }

    public async FindByToken(token: string): Promise<Token | null> {
        return await this.context.token.findUnique({
            where: { token }
        })
    }

    public async Delete(token: string): Promise<void> {
        await this.context.token.delete({
            where: { token }
        })
    }

    public async DeleteByUserId(userId: number): Promise<void> {
        await this.context.token.deleteMany({
            where: { userId }
        })
    }
}
