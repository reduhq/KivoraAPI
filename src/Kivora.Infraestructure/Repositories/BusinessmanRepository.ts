import { PrismaClient } from "@prisma/client";
import BusinessmanCreateDTO from "../../Kivora.AppCore/DTO/BusinessmanDTO/BusinessmanCreateDTO";
import BusinessmanUpdateDTO from "../../Kivora.AppCore/DTO/BusinessmanDTO/BusinessmanUpdateDTO";
import Businessman from "../../Kivora.Domain/Entities/Businessman";
import IBusinessmanRepository from "../../Kivora.Domain/Interfaces/IBusinessmanRepository";
import { KivoraContext } from "../../Kivora.Domain/KivoraContext";

export default class BusinessmanRepository implements IBusinessmanRepository{
    private context:PrismaClient

    constructor(){
        this.context = KivoraContext
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