export default interface IService<TModel, TCreate, TUpdate> {
    Create(_t: TCreate): Promise<TModel>
    Update(_id: number, _t: TUpdate): Promise<TModel | null>
    Delete(_id: number): Promise<boolean>
    GetAll(): Promise<Array<TModel>>
}
