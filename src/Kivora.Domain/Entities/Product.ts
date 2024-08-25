import { PRODUCT_STATE } from '@Kivora.Domain/Enums/PRODUCT_STATE'

export default class Product {
    public id: number = 0
    public businessId: number = 0
    public name: string = ''
    public description: string = ''
    public price: number = 0.0
    public quantity: number = 0
    public rate: number = 0
    public state: PRODUCT_STATE = PRODUCT_STATE.DISABLED
    public tags: string = ''
}
