import { Token } from '@prisma/client'

export default interface ITokenService {
    GenerateToken(userId: number): Promise<Token>
    ValidateToken(token: string): Promise<boolean>
    InvalidateToken(token: string): Promise<void>
}
