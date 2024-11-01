import { Expose } from 'class-transformer'
import User from './User'

export default class Customer {
    @Expose()
    public id!: string

    @Expose()
    public user?: User
}
