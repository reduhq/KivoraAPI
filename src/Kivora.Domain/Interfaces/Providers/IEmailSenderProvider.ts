export default interface IEmailSenderProvider {
    SendNewAccountEmail(
        emailTo: string,
        username: string,
        token: string
    ): Promise<void>

    SendWelcomeEmail(emailTo: string, username: string): Promise<void>
}
