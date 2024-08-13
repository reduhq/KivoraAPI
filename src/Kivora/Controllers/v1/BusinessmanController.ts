import { Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import settings from "../../Settings";
import ValidationMiddleware from "../../Middlewares/ValidationMiddleware";
import BusinessmanCreateDTO from "../../../Kivora.AppCore/DTO/BusinessmanDTO/BusinessmanCreateDTO";
// import IBusinessmanRepository from "../../../Kivora.Domain/Interfaces/IBusinessmanRepository";
// import { inject } from "inversify";


@controller(`${settings.API_V1_STR}/businessman`)
export default class BusinessmanController{
    // private businessmanRepository: IBusinessmanRepository

    // constructor(@inject('IBusinessmanRepository') businessmanRepository:IBusinessmanRepository){
    //     this.businessmanRepository = businessmanRepository
    // }

    @httpPost('/', ValidationMiddleware.body(BusinessmanCreateDTO))
    public async CreateBusinessman(req:Request, res:Response): Promise<Response>{
        console.log(req.body)
        return res.json(req.body)
    }
}