import { IAuthService } from '../model/services/iAuthService';
import { IStorageService } from '../model/services/iStorageService';

export class UploadImgController {
  private storageService: IStorageService;
  private authService: IAuthService;

  constructor(storageService: IStorageService, authService: IAuthService) {
    this.storageService = storageService;
    this.authService = authService;
  }

  async uploadImg(file: File): Promise<void> {
    try {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const extension = file.name.split('.').pop()??'-'.toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        throw new Error('Formato de arquivo inválido. Apenas JPG, JPEG e PNG são permitidos.');
      }

      if (file.size > 3 * 1024 * 1024) {
        throw new Error('O arquivo excede o tamanho máximo de 3MB.');
      }
      let uid : string | null = this.authService.getUserID();
      if(uid){
        await this.storageService.uploadImage(file, uid); // Call IStorageService
      }else{
        throw new Error('Você precisa estar logado para enviar imagens.');
      }
      

      console.log('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
      throw error; // Re-throw error for further handling
    }
  }
}
