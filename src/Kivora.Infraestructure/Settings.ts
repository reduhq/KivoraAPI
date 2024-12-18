import 'dotenv/config'
import crypto from 'crypto'

class Settings {
    public readonly PROJECT_NAME: string = 'Kivora'
    public readonly SERVER_HOST: string = process.env.SERVER_HOST as string
    public readonly FRONTEND_HOST: string = process.env.FRONTEND_HOST as string
    public readonly PORT: number = parseInt(process.env.PORT ?? '8000')
    public readonly API_V1_STR: string = '/api/v1'

    public readonly SECRET_KEY: string = crypto.randomBytes(32).toString('hex')
    public readonly ACCESS_TOKEN_EXPIRES_MINUTES: number = 60 * 5 // 5 Mins
    public readonly ALGORITHM: string = 'HS256'

    //REDIS
    public readonly REDIS_TOKEN: string = process.env.REDIS_TOKEN as string

    // ALGOLIA
    public readonly ALGOLIA_API_KEY: string = process.env
        .ALGOLIA_API_KEY as string
    public readonly ALGOLIA_APP_ID: string = process.env
        .ALGOLIA_APP_ID as string

    // SMTP config
    public readonly SMTP_HOST?: string = process.env.SMTP_HOST as string
    public readonly SMTP_TLS: boolean = true
    public readonly SMTP_PORT?: number =
        parseInt(process.env.SMTP_PORT as string) ?? undefined
    public readonly SMTP_USER: string = process.env.SMTP_USER as string
    public readonly SMTP_PASSWORD: string = process.env.SMTP_PASSWORD as string

    // Email config
    public readonly EMAILS_FROM_EMAIL?: string = process.env.EMAILS_FROM_EMAIL
    public readonly EMAILS_FROM_NAME?: string = process.env.EMAILS_FROM_NAME
    public readonly EMAIL_RESET_TOKEN_EXPIRE_MINUTES: number = 60 * 15 // 15 Mins
    public readonly EMAILS_ENABLED: boolean = this.VALIDATE_EMAILS_ENABLED()

    private VALIDATE_EMAILS_ENABLED(): boolean {
        if (
            process.env.SMTP_HOST &&
            process.env.SMTP_PORT &&
            process.env.EMAILS_FROM_EMAIL
        ) {
            return true
        }
        return false
    }

    public readonly CLOUDINARY_API_KEY: string = process.env
        .CLOUDINARY_API_KEY as string
    public readonly CLOUDINARY_API_SECRET: string = process.env
        .CLOUDINARY_API_SECRET as string
    public readonly CLOUDINARY_CLOUD_NAME: string = process.env
        .CLOUDINARY_CLOUD_NAME as string
}

const settings = new Settings()

export default settings
