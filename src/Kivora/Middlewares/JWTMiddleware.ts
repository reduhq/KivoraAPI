import IUserService from '@Kivora.AppCore/Interfaces/IUserService'
import { ROLE } from '@Kivora.Domain/Enums/ROLE'
import settings from '@Kivora.Infraestructure/Settings'
import { container } from '@Kivora/inversify.config'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export default class JWTMiddleware {
    private static userService: IUserService = container.get('IUserService')

    private static VerifyJWT(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization
        if (!token) return res.status(403).json('Usuario no autenticado')
        try {
            const validToken = verify(token.split(' ')[1], settings.SECRET_KEY)
            res.locals.userId = parseInt(validToken.sub as string)
        } catch (e) {
            return res.status(500).json('Token invalido')
        }
        return next()
    }

    public static GetCurrentBusinessman() {
        return async (req: Request, res: Response, next: NextFunction) => {
            // Verifying the JWT
            const result = JWTMiddleware.VerifyJWT(req, res, next)
            if (result) return result
            // Getting the current user
            const userId = res.locals.userId
            const user = await JWTMiddleware.userService.GetById(userId)
            if (!user) return res.status(404).json('Usuario invalido')
            if (user.role != ROLE.BUSINESSMAN) {
                return res.status(400).json('Usuario no autorizado')
            }
            // Saving the User Model
            res.locals.userModel = user
            return next()
        }
    }
}
