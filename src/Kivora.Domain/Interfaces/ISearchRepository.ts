import Search from '@Kivora.Domain/Entities/Search'
import IRepository from './IRepository'
import SearchCreateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchCreateDTO'
import SearchUpdateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchUpdateDTO'

export default interface ISearchRepository
    extends IRepository<Search, SearchCreateDTO, SearchUpdateDTO> {}
