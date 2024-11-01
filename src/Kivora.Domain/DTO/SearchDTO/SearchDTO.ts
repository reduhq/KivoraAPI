import { Expose } from 'class-transformer'

/**
 *  @swagger
 *  components:
 *      schemas:
 *          SearchDTO:
 *              type: object
 *              properties:
 *                  search_query:
 *                      type: string
 *                      example: ''
 */
export default class SearchDTO {
    @Expose()
    public search_query!: string
}
