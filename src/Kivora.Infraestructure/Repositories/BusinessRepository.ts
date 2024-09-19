import BusinessCreateDTO from '@Kivora.Domain/DTO/BusinessDTO/BusinessCreateDTO'
import BusinessUpdateDTO from '@Kivora.Domain/DTO/BusinessDTO/BusinessUpdateDTO'
import Business from '@Kivora.Domain/Entities/Business'
import IBusinessRepository from '@Kivora.Domain/Interfaces/IBusinessRepository'
import { KivoraContext } from '@Kivora.Domain/KivoraContext'
import { PrismaClient } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import { injectable } from 'inversify'

@injectable()
export default class BusinessRepository implements IBusinessRepository {
    private context: PrismaClient

    constructor() {
        this.context = KivoraContext
    }
    public async ActivateBusiness(_id: number): Promise<boolean> {
        const business = await this.context.business.update({
            where: {
                id: _id
            },
            data: {
                isActive: true, // Actualizar propiedad isActive
                deactivationDate: null // Restablecer la fecha.
            }
        })

        return !!business
    }
    public async GetActiveBusiness(): Promise<Array<Business>> {
        // Obtener todos los negocios
        const allBusiness = await this.context.business.findMany()

        // Calcular la fecha límite de 30 días atrás
        const dateLimit = new Date()
        dateLimit.setDate(dateLimit.getDate() - 30)

        // Filtrar negocios por fecha, manejando el caso null
        const activeBusiness = allBusiness.filter((business) => {
            // Si deactivationDate es null, considerar el negocio como activo
            if (business.deactivationDate === null) {
                return true
            }

            // Convertir deactivationDate a objeto Date y compararlo con dateLimit
            const businessDate = new Date(business.deactivationDate)
            return businessDate >= dateLimit
        })

        return plainToInstance(Business, activeBusiness, {
            excludeExtraneousValues: true
        })
    }

    public async GetById(id: number): Promise<Business> {
        const business = await this.context.business.findFirst({
            where: {
                id
            }
        })
        return plainToInstance(Business, business, {
            excludeExtraneousValues: true
        })
    }

    public async Create(_t: BusinessCreateDTO): Promise<Business> {
        const businessReponse = await this.context.business.create({
            data: _t
        })
        return plainToInstance(Business, businessReponse, {
            excludeExtraneousValues: true
        })
    }
    public async Update(id: number, _t: BusinessUpdateDTO): Promise<Business> {
        const business = await this.context.business.update({
            data: _t,
            where: {
                id
            }
        })

        return plainToInstance(Business, business, {
            excludeExtraneousValues: true
        })
    }
    public async Delete(_id: number): Promise<boolean> {
        const business = await this.context.business.update({
            where: {
                id: _id
            },
            data: {
                isActive: false, // Actualizar propiedad isActive
                deactivationDate: new Date() // Establecer la fecha de desactivación
            }
        })

        return !!business
    }
    public async GetAll(): Promise<Business[]> {
        const business = await this.context.business.findMany()
        return plainToInstance(Business, business, {
            excludeExtraneousValues: true
        })
    }
}
