import { Expose } from 'class-transformer'

export default class Client {
    @Expose()
    public id!: number
}
