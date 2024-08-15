export interface IEmailService {
    sendConfirmationEmail(user: {
        email: string
        name: string
        token: string
    }): Promise<void>
    sendPasswordResetToken(user: {
        email: string
        name: string
        token: string
    }): Promise<void>
}
