import { Expose } from 'class-transformer'

export default class Search {
    @Expose()
    public text!: string
}
