import { Expose } from 'class-transformer'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          BusinessDTO:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      format: int64
 *                      example: 0
 *                  businessmanId:
 *                      type: integer
 *                      format: int64
 *                      example: 0
 *                  name:
 *                      type: string
 *                      example: 'Business Name'
 *                  picture:
 *                      type: string
 *                      example: 'https://example.com/image.jpg'
 *                  description:
 *                      type: string
 *                      example: 'Description of the business'
 *                  location:
 *                      type: string
 *                      example: 'Location details'
 *                  adress:
 *                      type: string
 *                      example: '123 Street, City, Country'
 *                  whatsapp:
 *                      type: string
 *                      example: '+1234567890'
 *                  instagram:
 *                      type: string
 *                      example: '@business_instagram'
 *                  x:
 *                      type: string
 *                      example: 'Additional field'
 *                  facebook:
 *                      type: string
 *                      example: 'facebook.com/business'
 *                  rate:
 *                      type: number
 *                      format: float
 *                      example: 4.5
 *                  isActive:
 *                      type: boolean
 *                      example: true
 */

export default class BusinessDTO {
    @Expose()
    id: number = 0
    @Expose()
    businessmanId: number = 0
    @Expose()
    name: string = ''
    @Expose()
    picture: string = ''
    @Expose()
    description: string = ''
    @Expose()
    location: string = ''
    @Expose()
    adress: string = ''
    @Expose()
    whatsapp: string = ''
    @Expose()
    instagram: string = ''
    @Expose()
    x: string = ''
    @Expose()
    facebook: string = ''
    @Expose()
    rate: number = 0
    @Expose()
    isActive: boolean = true
}
