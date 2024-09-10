export default interface INodemailerProvider {
    SendMail(
        emailTo: string,
        subjectTemplate: string,
        htmlTemplate: string,
        environment: {
            [key: string]: string
        }
    ): Promise<void>

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
    SendNewAccountEmail(
        emailTo: string,
        username: string,
        token: string
    ): Promise<void>

    SendWelcomeEmail(emailTo: string, username: string): Promise<void>
}
