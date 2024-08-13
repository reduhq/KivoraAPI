
export default class User {
    private _id: number
    private _username: string
    private _password: string
    private _email: string
    private _name: string
    private _profilePicture: string | null = null
    private _phone: string | null = null
    private _role: string
    private _createdAt: Date

    constructor(
        id: number,
        username: string,
        password: string,
        email: string,
        name: string,
        role: string,
        createdAt: Date,
    ) {
        this._id = id
        this._username = username
        this._password = password
        this._email = email
        this._name = name
        this._role = role
        this._createdAt = createdAt
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number
    ) {
        this._id = id;
    }

    public get username(): string {
        return this._username;
    }

    public set username(username: string
    ) {
        this._username = username;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string
    ) {
        this._password = password;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string
    ) {
        this._email = email;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string
    ) {
        this._name = name;
    }

    public get profilePicture(): string | null {
        return this._profilePicture;
    }

    public set profilePicture(profilePicture: string | null) {
        this._profilePicture = profilePicture;
    }

    public get phone(): string | null {
        return this._phone;
    }

    public set phone(phone: string | null) {
        this._phone = phone;
    }

    public get role(): string {
        return this._role;
    }

    public set role(role: string
    ) {
        this._role = role;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }





} 