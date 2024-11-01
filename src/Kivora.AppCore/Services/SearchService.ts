import ISearchService from '@Kivora.AppCore/Interfaces/ISearchService'
import SearchCreateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchCreateDTO'
import SearchUpdateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchUpdateDTO'
import Search from '@Kivora.Domain/Entities/Search'
import ISearchRepository from '@Kivora.Domain/Interfaces/ISearchRepository'
import { inject, injectable } from 'inversify'

@injectable()
export default class SearchService implements ISearchService {
    private readonly searchRepository: ISearchRepository
    constructor(
        @inject('ISearchRepository') searchRepository: ISearchRepository
    ) {
        this.searchRepository = searchRepository
    }

    public async SearchQuery(query: string): Promise<Search[]> {
        return await this.searchRepository.SearchQuery(query)
    }

    public async Create(t: SearchCreateDTO): Promise<Search> {
        return await this.searchRepository.Create(t)
    }
    Update(_id: number, _t: SearchUpdateDTO): Promise<Search | null> {
        throw new Error('Method not implemented.')
    }
    Delete(_id: number): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    GetAll(_limit?: number, _page?: number): Promise<Search[]> {
        throw new Error('Method not implemented.')
    }
}
