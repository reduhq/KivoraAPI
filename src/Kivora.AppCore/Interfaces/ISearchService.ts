import Search from '@Kivora.Domain/Entities/Search'
import SearchCreateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchCreateDTO'
import SearchUpdateDTO from '@Kivora.Domain/DTO/SearchDTO/SearchUpdateDTO'
import IService from './IService'

export default interface ISearchService
    extends IService<Search, SearchCreateDTO, SearchUpdateDTO> {}
