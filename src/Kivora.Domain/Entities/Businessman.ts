import { Expose } from 'class-transformer'
import User from './User'

export default class Businessman {
    private _id: string
    private _user: User | null

    constructor(id: string, user: User) {
        this._id = id
        this._user = user
    }

    public get id(): string {
        return this._id
    }

    @Expose() public set id(id: string) {
        this._id = id
    }

    public get user(): User | null {
        return this._user
    }

    @Expose() public set user(user: User) {
        this._user = user
    }
}
