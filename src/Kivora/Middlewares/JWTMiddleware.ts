import IUserService from '@Kivora.AppCore/Interfaces/IUserService'
import settings from '@Kivora/Settings'
import { Request, Response, NextFunction } from 'express'
import { inject } from 'inversify'
import { verify } from 'jsonwebtoken'

export default class JWTMiddleware {
    private static userService: IUserService

    constructor(@inject('IUserService') userService: IUserService) {
        JWTMiddleware.userService = userService
    }

    private static VerifyJWT(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization
        if (!token) return res.status(403).json('Usuario no autorizado')
        try {
            const validToken = verify(token.split(' ')[1], settings.SECRET_KEY)
            res.locals.userId = parseInt(validToken.sub as string)
        } catch (e) {
            return res.status(500).json('Token invalido')
        }
        return next()
    }

    public static async GetCurrentUser(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        this.VerifyJWT(req, res, next)
        // Getting the current user id
        const id = res.locals.userId
        res.locals.CurrentUser = await this.userService.GetById(id)
        return next()
    }
}
