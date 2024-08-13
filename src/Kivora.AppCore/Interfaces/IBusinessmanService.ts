import Businessman from "../../Kivora.Domain/Entities/Businessman";
import BusinessmanCreateDTO from "../DTO/BusinessmanDTO/BusinessmanCreateDTO";
import BusinessmanUpdateDTO from "../DTO/BusinessmanDTO/BusinessmanUpdateDTO";
import IService from "./IService";

export default interface IBusinessmanService extends IService<Businessman, BusinessmanCreateDTO, BusinessmanUpdateDTO> {
    
}