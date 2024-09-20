import { Expose } from 'class-transformer'
import User from './User'

export default class Client {
    @Expose()
    public id!: number

    @Expose()
    public user?: User
}
