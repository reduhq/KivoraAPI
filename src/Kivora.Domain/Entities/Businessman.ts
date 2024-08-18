import { Expose } from 'class-transformer'
import User from './User'

export default class Businessman {
    private _id: number
    private _user: User | null

    constructor(id: number, user: User) {
        this._id = id
        this._user = user
    }

    public get id(): number {
        return this._id
    }

    @Expose() public set id(id: number) {
        this._id = id
    }

    public get user(): User | null {
        return this._user
    }

    @Expose() public set user(user: User) {
        this._user = user
    }
}
