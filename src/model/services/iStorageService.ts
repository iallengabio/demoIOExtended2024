export interface IStorageService {
    uploadImage(file: File, fodler:string): Promise<string>;
    getDownloadURL(storageURL:string):Promise<string>;
}
  