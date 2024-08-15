import nodemailer from 'nodemailer'

function ensureEnvVariable(name: string): string {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`)
    }
    return value
}

const config = () => {
    return {
        host: ensureEnvVariable('SMTP_HOST'),
        port: +ensureEnvVariable('SMTP_PORT'),
        auth: {
            user: ensureEnvVariable('SMTP_USER'),
            pass: ensureEnvVariable('SMTP_PASSWORD')
        }
    }
}

export const transporter = nodemailer.createTransport(config())
