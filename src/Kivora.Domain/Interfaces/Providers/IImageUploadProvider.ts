export default interface IImageUploadProvider {
    UploadImage(image: Buffer): Promise<string | null>
}
