import { Expose } from 'class-transformer'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          SearchDTO:
 *              type: object
 *              properties:
 *                  text:
 *                      type: string
 *                      example: ''
 */
export default class SearchDTO {
    @Expose()
    public text!: string
}
