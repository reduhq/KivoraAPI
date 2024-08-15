import { PrismaClient } from '@prisma/client'

class PrismaSingleton {
    private static instance: PrismaClient

  private constructor() {} // Hacer el constructor privado evita instanciaciones externas

    public static getInstance(): PrismaClient {
        if (!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaClient()
        }
        return PrismaSingleton.instance
    }
}

const db = PrismaSingleton.getInstance()

export { db as KivoraContext }
