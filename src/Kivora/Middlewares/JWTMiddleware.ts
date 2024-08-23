import settings from '@Kivora.Infraestructure/Settings'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export default class JWTMiddleware {
    public static VerifyJWT() {
        return (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization
            if (!token) return res.status(403).json('Usuario no autorizado')
            try {
                const validToken = verify(
                    token.split(' ')[1],
                    settings.SECRET_KEY
                )
                res.locals.userId = parseInt(validToken.sub as string)
            } catch (e) {
                return res.status(500).json('Token invalido')
            }
            return next()
        }
    }
}
