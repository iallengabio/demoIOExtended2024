import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './util/firebaseInit'; // Assuming storage is initialized in firebaseInit
import { IStorageService } from './iStorageService';

export class FirebaseStorageService implements IStorageService {
  
  async getDownloadURL(storageURL: string): Promise<string> {
      const storageRef = ref(storage, storageURL);
      return getDownloadURL(storageRef);
  }
  
  async uploadImage(file: File, folder:string): Promise<string> {

    // Generate a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/\.[^.]+$/, ''); // Remove milliseconds
    const filename = `${timestamp}-${file.name}`;
    const storageRef = ref(storage, `users/${folder}/images/${filename}`);

    // Upload the image
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed',
      (snapshot) => {
        // Optional: Track upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload progress:', progress, '%');
      },
      (error) => {
        // Handle upload errors
        console.error('Pegando erro aqui:', error);
        throw error;
      },
      ()=>{//aqui o download completou com sucesso

      }
    );

    await uploadTask.then();

    // Get the download URL after successful upload
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;

  }
}
