import UserDTO from '@Kivora.AppCore/DTO/UserDTO/UserDTO'

export default class Businessman {
    private _id: number
    private _user: UserDTO

    constructor(id: number, user: UserDTO) {
        this._id = id
        this._user = user
    }

    public get id(): number {
        return this._id
    }

    public set id(id: number) {
        this._id = id
    }

    public get user(): UserDTO {
        return this._user
    }

    public set user(user: UserDTO) {
        this._user = user
    }
}
