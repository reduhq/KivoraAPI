import { sign } from 'jsonwebtoken'
import settings from '../../Kivora/Settings'

export default class JWT {
    // JWT
    public static CreateJWT(
        subject: string | number,
        expiresDelta: number | null = null
    ) {
        // Setting the expire time of the token
        let expire
        if (expiresDelta) {
            expire = Math.floor(Date.now() / 1000) + expiresDelta
        } else {
            expire =
                Math.floor(Date.now() / 1000) +
                settings.ACCESS_TOKEN_EXPIRES_MINUTES
        }
        // Setting the payload
        const toEncode = {
            exp: expire,
            sub: subject.toString()
        }
        // Signing the Token
        const encodedJWT = sign(toEncode, settings.SECRET_KEY)
        return encodedJWT
    }

    public static GenerateNewAccountToken(id: number) {
        const delta: number = settings.EMAIL_RESET_TOKEN_EXPIRE_MINUTES
        const expire: number = Math.floor(Date.now() / 1000) + delta
        // setting the payload
        const toEncode = {
            exp: expire,
            sub: id.toString()
        }
        // Signing the token
        const encodedJWT = sign(toEncode, settings.SECRET_KEY)
        return encodedJWT
    }
}
