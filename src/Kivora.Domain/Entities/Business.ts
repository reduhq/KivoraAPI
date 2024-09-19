import { Expose } from 'class-transformer'
import Businessman from './Businessman'

export default class Business {
    private _id: number
    private _businessmanId: number
    private _name: string
    private _picture: string | null = null
    private _description: string
    private _location: string
    private _adress: string
    private _whatsapp: string | null = null
    private _instagram: string | null = null
    private _x: string | null = null
    private _facebook: string | null = null
    private _rate: number | null = null
    private _isActive: boolean | null = null
    private _deactivationDate: Date | null = null

    private _businessman: Businessman

    constructor(
        id: number,
        businessmanId: number,
        name: string,
        picture: string,
        description: string,
        location: string,
        adress: string,
        whatsaap: string,
        instagram: string,
        facebook: string,
        x: string,
        rate: number,
        businessman: Businessman,
        isActive: boolean,
        deactivationDate: Date
    ) {
        this._id = id
        this._businessmanId = businessmanId
        this._name = name
        this._picture = picture
        this._description = description
        this._location = location
        this._adress = adress
        this._whatsapp = whatsaap
        this._instagram = instagram
        this._x = x
        this._facebook = facebook
        this._rate = rate
        this._isActive = isActive
        this._deactivationDate = deactivationDate

        this._businessman = businessman
    }

    public get id() {
        return this._id
    }

    @Expose()
    public set id(val: number) {
        this._id = val
    }

    public get businessmanId() {
        return this._businessmanId
    }

    @Expose()
    public set businessmanId(val: number) {
        this._businessmanId = val
    }

    public get name() {
        return this._name
    }

    @Expose()
    public set name(val: string) {
        this._name = val
    }

    public get picture() {
        return this._picture
    }

    @Expose()
    public set picture(val: string | null) {
        this._picture = val
    }

    public get description() {
        return this._description
    }
    @Expose()
    public set description(val: string) {
        this._description = val
    }

    public get location() {
        return this._location
    }

    @Expose()
    public set location(val: string) {
        this._location = val
    }

    public get adress() {
        return this._adress
    }

    @Expose()
    public set adress(val: string) {
        this._adress = val
    }

    public get whatsapp() {
        return this._whatsapp
    }

    @Expose()
    public set whatsapp(val: string | null) {
        this._whatsapp = val
    }

    public get instagram() {
        return this._instagram
    }

    @Expose()
    public set instagram(val: string | null) {
        this._instagram = val
    }

    public get x() {
        return this._x
    }

    @Expose()
    public set x(val: string | null) {
        this._x = val
    }

    public get facebook() {
        return this._facebook
    }

    @Expose()
    public set facebook(val: string | null) {
        this._facebook = val
    }

    public get rate() {
        return this._rate
    }

    @Expose()
    public set rate(val: number | null) {
        this._rate = val
    }

    public get isActive() {
        return this._isActive
    }

    @Expose()
    public set isActive(val: boolean | null) {
        this._isActive = val
    }

    public get deactivationDate() {
        return this._deactivationDate
    }

    @Expose()
    public set deactivationDate(val: Date | null) {
        this._deactivationDate = val
    }

    public get businessman() {
        return this._businessman
    }

    @Expose()
    public set businessman(val: Businessman) {
        this._businessman = val
    }
}
