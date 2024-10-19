import { Expose } from 'class-transformer'
import { IsOptional } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          BusinessUpdateDTO:
 *              type: object
 *              properties:
 *                  businessmanId:
 *                      type: integer
 *                      format: int64
 *                      example: 0
 *                      description: 'Se necesita especificar el emprendedor del negocio'
 *                  name:
 *                      type: string
 *                      example: 'Business Name'
 *                      description: 'El campo nombre no puede estar vacio'
 *                      nullable: true
 *                  picture:
 *                      type: string
 *                      example: 'https://example.com/image.jpg'
 *                      nullable: true
 *                  description:
 *                      type: string
 *                      example: 'Description of the business'
 *                      description: 'El campo descripcion no puede estar vacio'
 *                      nullable: true
 *                  location:
 *                      type: string
 *                      example: 'Location details'
 *                      description: 'El localizacion nombre no puede estar vacio'
 *                      nullable: true
 *                  adress:
 *                      type: string
 *                      example: '123 Street, City, Country'
 *                      description: 'El campo direccion no puede estar vacio'
 *                      nullable: true
 *                  whatsapp:
 *                      type: string
 *                      example: '+1234567890'
 *                      nullable: true
 *                  instagram:
 *                      type: string
 *                      example: '@business_instagram'
 *                      nullable: true
 *                  x:
 *                      type: string
 *                      example: 'Additional field'
 *                      nullable: true
 *                  facebook:
 *                      type: string
 *                      example: 'facebook.com/business'
 *                      nullable: true
 */

export default class BusinessUpdateDTO {
    @Expose()
    @IsOptional()
    name!: string

    @Expose()
    @IsOptional()
    picture!: string

    @Expose()
    @IsOptional()
    description!: string

    @Expose()
    @IsOptional()
    location!: string

    @Expose()
    @IsOptional()
    adress!: string

    @Expose()
    @IsOptional()
    whatsapp!: string

    @Expose()
    @IsOptional()
    instagram!: string

    @Expose()
    @IsOptional()
    x!: string

    @Expose()
    @IsOptional()
    facebook!: string
}
