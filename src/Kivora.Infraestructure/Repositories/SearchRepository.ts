import { SearchClient, SearchResponses } from '@algolia/client-search'
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

    public async SearchQuery(query: string): Promise<Search[]> {
        const response: SearchResponses<Search> =
            await this.algoliaContext.search<Search>({
                requests: [
                    {
                        indexName: 'search_index',
                        query: query,
                        hitsPerPage: 5
                    }
                ]
            })
        return plainToInstance(
            Search,
            (response.results[0] as { hits: Search[] }).hits,
            {
                excludeExtraneousValues: true
            }
        )
    }

    public async Create(t: SearchCreateDTO): Promise<Search> {
        await this.context.zincrby('search', 1, t.text)
        const search = { search_query: t.text }

        // getting an object from algolia
        const searchItem = await this.algoliaContext
            .getObject({
                indexName: 'search_index',
                objectID: t.text
            })
            .catch((_e) =>
                console.log(
                    'Buscando una sugerencia con un ObjectId inexistente... Creando nuevo registro de sugerencia'
                )
            )

        // Adding a register to algolia search_index
        const searchObject = plainToInstance(Search, searchItem, {
            excludeExtraneousValues: true
        })
        await this.algoliaContext.saveObjects({
            indexName: 'search_index',
            objects: [
                {
                    objectID: t.text,
                    search_query: t.text,
                    search_count: searchObject
                        ? searchObject.search_count + 1
                        : 1
                }
            ]
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
    public async GetAll(_limit?: number, _page?: number): Promise<Search[]> {
        throw new Error('Method not implemented.')
    }
}
