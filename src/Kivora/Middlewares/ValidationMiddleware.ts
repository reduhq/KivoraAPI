import { Request, Response, NextFunction } from "express"
import {plainToClass} from 'class-transformer'
import { validate, ValidationError } from "class-validator"
import { Result, validationResult } from "express-validator"

export default class ValidationMiddleware{
    public static body<T extends object>(dto:new()=>T){
        return (req:Request, res:Response, next:NextFunction)=>{
            const modelDTO = plainToClass(dto, req.body, {excludeExtraneousValues: true})

            validate(modelDTO).then((errors:ValidationError[]) =>{
                if(errors.length > 0){
                    // Validation Error : 422
                    return res.status(422).json({"errors": this.ShowErrors(errors)})
                }
                req.body = modelDTO
                return next()
            })
        }
    }

    private static ShowErrors(errors:ValidationError[], parent:string=""){
        let result:{[property:string]:string[]} = {}
        errors.forEach(error =>{
            if(error.children && error.children.length > 0){
                result = {...result, ...this.ShowErrors(error.children, error.property)}
            }else{
                result[`${parent&&`${parent}.`}${error.property}`] = Object.values(error.constraints!)
            }
        })
        return result
    }


    // EXPRESS VALIDATOR
    public static validate(){
        return (req:Request, res:Response, next:NextFunction)=>{
            // Validating the request body
            const errors:Result = validationResult(req)
            if(!errors.isEmpty()){
                // Validation error: 422
                return res.status(422).json(this.FormatExpressValidator(errors))
            }
            return next()
        }
    }
    
    private static FormatExpressValidator(errors: Result):{"errors": {[path:string]:string[]}}{
        let result:{[path:string]:string[]} = {}
        errors.array().forEach(error =>{
            if(!result[error['path'] as string]){
                result[error['path'] as string] = []
            }
            result[error['path'] as string] = [...result[error['path'] as string], error['msg']]
        })
        return {"errors": result}
    }
}