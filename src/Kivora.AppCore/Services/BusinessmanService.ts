import { inject, injectable } from "inversify";
import Businessman from "../../Kivora.Domain/Entities/Businessman";
import BusinessmanCreateDTO from "../DTO/BusinessmanDTO/BusinessmanCreateDTO";
import BusinessmanUpdateDTO from "../DTO/BusinessmanDTO/BusinessmanUpdateDTO";
import IBusinessmanService from "../Interfaces/IBusinessmanService";
import IBusinessmanRepository from "../../Kivora.Domain/Interfaces/IBusinessmanRepository";

@injectable()
export default class BusinessmanService implements IBusinessmanService{
    private businessmanRepository:IBusinessmanRepository

    constructor(@inject('IBusinessmanRepository') businessmanRepository:IBusinessmanRepository){
        this.businessmanRepository = businessmanRepository
    }
    Create(_t: BusinessmanCreateDTO): Promise<Businessman> {
        throw new Error("Method not implemented.");
    }
    Update(_t: BusinessmanUpdateDTO): Promise<Businessman> {
        throw new Error("Method not implemented.");
    }
    Delete(_id: number): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    GetAll(): Promise<Businessman[]> {
        throw new Error("Method not implemented.");
    }

}