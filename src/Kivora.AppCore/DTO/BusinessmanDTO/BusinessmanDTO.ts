import { Expose, Type } from 'class-transformer'
import UserDTO from '../UserDTO/UserDTO'

export default class BusinessmanDTO {
    @Expose()
    id: number = 0

    @Expose()
    @Type(() => UserDTO)
    user: UserDTO = new UserDTO()
}
