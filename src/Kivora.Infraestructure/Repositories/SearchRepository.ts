import { SearchClient } from '@algolia/client-search'
import SearchCreateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchCreateDTO'
import SearchUpdateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchUpdateDTO'
import Search from '@Kivora.Domain/Entities/Search'
import ISearchRepository from '@Kivora.Domain/Interfaces/ISearchRepository'
import { algoliaClient } from '@Kivora.Infraestructure/Data/KivoraAlgoliaContext'
import { redis } from '@Kivora.Infraestructure/Data/KivoraRedisContext'
import { Redis } from '@upstash/redis'
import { plainToInstance } from 'class-transformer'
import { injectable } from 'inversify'

@injectable()
export default class SearchRepository implements ISearchRepository {
    private readonly context: Redis
    private readonly algoliaContext: SearchClient
    constructor() {
        this.context = redis
        this.algoliaContext = algoliaClient
    }
    public async Create(t: SearchCreateDTO): Promise<Search> {
        await this.context.zincrby('search', 1, t.text)
        const search = { text: t.text }

        await this.algoliaContext.saveObjects({
            indexName: 'search_index',
            objects: [{ search_query: t.text, search_count: 1 }]
        })

        return plainToInstance(Search, search, {
            excludeExtraneousValues: true
        })
    }
    Update(_id: number, _t: SearchUpdateDTO): Promise<Search> {
        throw new Error('Method not implemented.')
    }
    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    GetAll(_limit?: number, _page?: number): Promise<Search[]> {
        throw new Error('Method not implemented.')
    }
}
