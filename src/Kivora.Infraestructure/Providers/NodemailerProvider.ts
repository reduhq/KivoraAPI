import INodemailerProvider from '@Kivora.Domain/Interfaces/Providers/INodemailerProvider'
import settings from '@Kivora.Infraestructure/Settings'
import { injectable } from 'inversify'
import nodemailer from 'nodemailer'
import nunjucks from 'nunjucks'
import path from 'path'

@injectable()
export default class NodemailerProvider implements INodemailerProvider {
    private transporter

    constructor() {
        // if (!settings.EMAILS_ENABLED) {
        //     throw new Error('El envio de email no esta habilitado')
        // }

        // Configurar nodemailer (SMTP transporter)
        this.transporter = nodemailer.createTransport({
            host: settings.SMTP_HOST,
            port: settings.SMTP_PORT,
            auth: {
                user: settings.SMTP_USER,
                pass: settings.SMTP_PASSWORD
            }
        })

        // Configurar Nunjucks para la generacion de HTML
        nunjucks.configure(
            path.resolve(__dirname, '../EmailTemplates/buildHTML'),
            { autoescape: true }
        )
    }

    // Metodo para enviar un correo generico
    async SendMail(
        emailTo: string,
        subjectTemplate: string,
        htmlTemplate: string,
        environment: { [key: string]: string }
    ): Promise<void> {
        const html = nunjucks.render(htmlTemplate, environment)

        const message = {
            from: `"${settings.EMAILS_FROM_NAME}" <${settings.EMAILS_FROM_EMAIL}>`,
            to: emailTo,
            subject: subjectTemplate,
            html
        }

        await this.transporter.sendMail(message)
    }
    // Implementación de métodos específicos de la interfaz
    async sendConfirmationEmail(user: {
        email: string
        name: string
        token: string
    }): Promise<void> {
        const subjectTemplate = `${settings.PROJECT_NAME} - Confirma tu cuenta`
        const htmlTemplate = 'ConfirmationEmail.html'
        const link = `${settings.FRONTEND_HOST}/confirm-account?token=${user.token}`

        await this.SendMail(user.email, subjectTemplate, htmlTemplate, {
            link,
            username: user.name
        })
    }

    async sendPasswordResetToken(user: {
        email: string
        name: string
        token: string
    }): Promise<void> {
        const subjectTemplate = `${settings.PROJECT_NAME} - Restablecer tu contraseña`
        const htmlTemplate = 'PasswordReset.html'
        const link = `${settings.FRONTEND_HOST}/reset-password?token=${user.token}`

        await this.SendMail(user.email, subjectTemplate, htmlTemplate, {
            link,
            username: user.name
        })
    }

    // Nuevos métodos implementados
    public async SendNewAccountEmail(
        emailTo: string,
        username: string,
        token: string
    ): Promise<void> {
        const subjectTemplate = `${settings.PROJECT_NAME} - Nueva cuenta creada para @${username}`
        const htmlTemplate = 'NewAccount.html'
        const link = `${settings.FRONTEND_HOST}/verified-account?token=${token}`

        await this.SendMail(emailTo, subjectTemplate, htmlTemplate, {
            link: link,
            valid_minutes: (
                settings.EMAIL_RESET_TOKEN_EXPIRE_MINUTES / 60
            ).toString(),
            username: username
        })
    }

    public async SendWelcomeEmail(
        emailTo: string,
        username: string
    ): Promise<void> {
        const subjectTemplate = `Te damos la bienvenida a ${settings.PROJECT_NAME}`
        const htmlTemplate = 'Welcome.html'
        const link = settings.FRONTEND_HOST

        await this.SendMail(emailTo, subjectTemplate, htmlTemplate, {
            link: link,
            username: username
        })
    }
}
