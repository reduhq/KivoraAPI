// import { promises as fs } from 'fs'
import nodemailer from 'nodemailer'
import settings from '@Kivora/Settings'
import nunjucks from 'nunjucks'
import path from 'path'

export default class Nodemailer {
    private static async SendMail(
        emailTo: string,
        subjectTemplate: string = '',
        htmlTemplate: string = '',
        environment: { [value: string]: string } = {}
    ) {
        if (!settings.EMAILS_ENABLED) {
            throw new Error('El envio de email no esta habillitado')
        }
        // Configuring nodemailer (SMTP transporter)
        const transporter = nodemailer.createTransport({
            host: settings.SMTP_HOST,
            port: settings.SMTP_PORT,
            // secure: settings.SMTP_TLS,
            auth: {
                user: settings.SMTP_USER,
                pass: settings.SMTP_PASSWORD
            }
        })
        // Render HTML
        nunjucks.configure(
            path.resolve(__dirname, '../EmailTemplates/buildHTML'),
            { autoescape: true }
        )
        const html = nunjucks.render(htmlTemplate, environment)
        // Creating the message
        const message = {
            from: `"${settings.EMAILS_FROM_NAME}" <${settings.EMAILS_FROM_EMAIL}>`,
            to: emailTo,
            subject: subjectTemplate,
            html: html
        }
        // Sending the email
        await transporter.sendMail(message)
    }

    public static async SendNewAccountEmail(
        emailTo: string,
        username: string,
        token: string
    ) {
        const subjectTemplate = `${settings.PROJECT_NAME} - Nueva cuenta creada para @${username}`
        const htmlTemplate = 'NewAccount.html'
        const link = `${settings.SERVER_HOST}/verified-account?token=${token}`
        await this.SendMail(emailTo, subjectTemplate, htmlTemplate, {
            link: link,
            valid_minutes: (
                settings.EMAIL_RESET_TOKEN_EXPIRE_MINUTES / 60
            ).toString(),
            username: username
        })
    }
}
