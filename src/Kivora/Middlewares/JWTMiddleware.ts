import IBusinessmanService from '@Kivora.AppCore/Interfaces/IBusinessmanService'
import IUserService from '@Kivora.AppCore/Interfaces/IUserService'
import { ROLE } from '@Kivora.Domain/Enums/ROLE'
import settings from '@Kivora.Infraestructure/Settings'
import { container } from '@Kivora/inversify.config'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export default class JWTMiddleware {
    private static businessmanService: IBusinessmanService = container.get(
        'IBusinessmanService'
    )
    private static userService: IUserService = container.get('IUserService')

    private static VerifyJWT(req: Request, res: Response) {
        const token = req.headers.authorization
        if (!token) return res.status(403).json('Usuario no autenticado')
        try {
            const validToken = verify(token.split(' ')[1], settings.SECRET_KEY)
            res.locals.userId = parseInt(validToken.sub as string)
        } catch (e) {
            return res.status(500).json('Token invalido')
        }
        return false
    }

    public static GetCurrentBusinessman(getFullModel: boolean = false) {
        return async (req: Request, res: Response, next: NextFunction) => {
            // Verifying the JWT
            const result = JWTMiddleware.VerifyJWT(req, res)
            if (result) return result
            //
            const userId = res.locals.userId
            // Getting the full model
            if (getFullModel) {
                const businessman =
                    await JWTMiddleware.businessmanService.GetById(userId)
                if (!businessman)
                    return res.status(404).json('Usuario invalido')
                res.locals.businessmanModel = businessman
            } else {
                const user = await JWTMiddleware.userService.GetById(userId)
                if (!user) return res.status(404).json('Usuario no encontrado')
                if (user.role !== ROLE.BUSINESSMAN)
                    return res.status(403).json('Usuario no autorizado')
                res.locals.userModel = user
            }
            return next()
        }
    }
}
