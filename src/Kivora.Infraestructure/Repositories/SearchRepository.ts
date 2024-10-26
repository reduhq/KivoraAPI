import SearchCreateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchCreateDTO'
import SearchUpdateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchUpdateDTO'
import Search from '@Kivora.Domain/Entities/Search'
import ISearchRepository from '@Kivora.Domain/Interfaces/ISearchRepository'
import { redis } from '@Kivora.Infraestructure/Data/KivoraRedisContext'
import { Redis } from '@upstash/redis'
import { plainToInstance } from 'class-transformer'
import { injectable } from 'inversify'

@injectable()
export default class SearchRepository implements ISearchRepository {
    private readonly context: Redis
    constructor() {
        this.context = redis
    }
    public async Create(t: SearchCreateDTO): Promise<Search> {
        await this.context.zincrby('search', 1, t.text)
        const search = { text: t.text }
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
