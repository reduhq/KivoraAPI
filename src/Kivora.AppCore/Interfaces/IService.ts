
export default interface IRepository<TModel, TCreate, TUpdate>{
    Create(_t:TCreate): Promise<TModel>
    Update(_t:TUpdate): Promise<TModel>
    Delete(_id:number): Promise<Boolean>
    GetAll(): Promise<Array<TModel>>
}