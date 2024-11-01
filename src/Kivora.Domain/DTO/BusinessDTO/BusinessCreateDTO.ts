import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          BusinessCreateDTO:
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
 *                  picture:
 *                      type: string
 *                      example: 'https://example.com/image.jpg'
 *                  description:
 *                      type: string
 *                      example: 'Description of the business'
 *                      description: 'El campo descripcion no puede estar vacio'
 *                  location:
 *                      type: string
 *                      example: 'Location details'
 *                      description: 'El localizacion nombre no puede estar vacio'
 *                  adress:
 *                      type: string
 *                      example: '123 Street, City, Country'
 *                      description: 'El campo direccion no puede estar vacio'
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
 */

export default class BusinessCreateDTO {
    @Expose()
    @IsNumber()
    @IsNotEmpty({
        message: 'Se necesita especificar el emprendedor del negocio'
    })
    businessmanId!: string

    @Expose()
    @IsString()
    @IsNotEmpty({
        message: 'El campo nombre no puede estar vacio'
    })
    name!: string

    @Expose()
    @IsString()
    picture!: string

    @Expose()
    @IsString()
    @IsNotEmpty({
        message: 'El campo descripcion no puede estar vacio'
    })
    description!: string

    @Expose()
    @IsString()
    @IsNotEmpty({
        message: 'El localizacion nombre no puede estar vacio'
    })
    location!: string

    @Expose()
    @IsString()
    @IsNotEmpty({
        message: 'El campo direccion no puede estar vacio'
    })
    adress!: string

    @Expose()
    @IsString()
    whatsapp!: string

    @Expose()
    @IsString()
    instagram!: string

    @Expose()
    @IsString()
    x!: string

    @Expose()
    @IsString()
    facebook!: string
}
