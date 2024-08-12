
export default interface IRepository<TModel, TCreate, TUpdate>{
    Create(t:TCreate): Promise<TModel>
    Update(t:TUpdate): Promise<TModel>
    Delete(id:number): Promise<Boolean>
    GetAll(): Promise<Array<TModel>>
}