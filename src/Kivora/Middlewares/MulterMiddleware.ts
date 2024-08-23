import multer from 'multer'

export default class MulterMiddleware {
    private static upload = multer({
        storage: multer.memoryStorage(), // Necesario para almacenar temporalmente en el buffer
        // limits: { fileSize: 5 * 1024 * 1024 }, // Límite opcional de tamaño de archivo
        fileFilter: (_req, file, cb) => {
            // Opcional: Filtrar archivos según tipo MIME, si es necesario
            if (!file.mimetype.startsWith('image/')) {
                return cb(new Error('Solo se permiten imágenes'))
            }
            cb(null, true)
        }
    })

    public static UploadImage() {
        return this.upload
    }
}
