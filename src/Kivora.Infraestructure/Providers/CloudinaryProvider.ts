import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import IImageUploadProvider from '@Kivora.Domain/Interfaces/Providers/IImageUploadProvider'
import { injectable } from 'inversify'

@injectable()
export default class CloudinaryProvider implements IImageUploadProvider {
    public async UploadImage(image: Buffer): Promise<string | null> {
        try {
            // Subir el buffer a Cloudinary usando async/await
            const uploadResult: UploadApiResponse | undefined =
                await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        (error, result) => {
                            if (error) return reject(error)
                            resolve(result)
                        }
                    )

                    // Terminar el stream con el buffer
                    uploadStream.end(image)
                })
            return uploadResult?.secure_url as string
        } catch (error) {
            return null
        }
    }
}
