import { Expose } from 'class-transformer'

export default class Search {
    @Expose()
    public search_query!: string

    @Expose()
    public search_count!: number
}
