export default interface IRepository<TModel, TCreate, TUpdate> {
    Create(_t: TCreate): Promise<TModel>
    Update(_id: number, _t: TUpdate): Promise<TModel>
    Delete(_id: number): Promise<boolean>
    GetAll(limit?: number, page?: number): Promise<Array<TModel>>
}
