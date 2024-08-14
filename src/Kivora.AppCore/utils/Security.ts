import { compare, hash } from 'bcrypt'

export default class Security {
    // PASSWORD
    public static async HashPassword(password: string): Promise<string> {
        return await hash(password, 10)
    }

    public static async ValidatePassword(
        password: string,
        hash: string
    ): Promise<boolean> {
        return await compare(password, hash)
    }
}
