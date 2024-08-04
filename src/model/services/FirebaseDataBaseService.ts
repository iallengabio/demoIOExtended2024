
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { LabeledImage } from '../entities/labeledImage';
import { IDataBaseService } from './iDataBaseService';
import { db } from './util/firebaseInit';
import { IStorageService } from './iStorageService';

export class FirebaseDatabaseService implements IDataBaseService {

    storageService : IStorageService;

    constructor(storageService : IStorageService){
        this.storageService = storageService;
    }

    observeImageLabels(userID: string, callback: (updatedImages: LabeledImage[]) => void): ()=>void {
        
        const imageLabelsCollection = collection(db, 'ImageLabels');

        //filtrar apenas imagens do usuário
        const q = query(imageLabelsCollection, where('file', '>=', `gs://ioextendedphb2024.appspot.com/users/${userID}/images`), where('file', '<=', `gs://ioextendedphb2024.appspot.com/users/${userID}/images~`));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            //console.log(snapshot.docs);
            const updatedImages : LabeledImage[] = [];
            snapshot.docs.forEach((doc)=>{
                updatedImages.push(new LabeledImage(doc.data()['file']??'',doc.data()['labels']??[]));
            });
            //updateImageURLs
            this.updateImageURLs(updatedImages).then(()=>{
                callback(updatedImages);
            });
        });
        return unsubscribe;
    }



    //Este método atualiza as URLs das imagens de URLs do Storage para URLs de download
    private async updateImageURLs(labeledImages : LabeledImage[]):Promise<void>{
        for(let i=0;i<labeledImages.length;i++){
            if(labeledImages[i].imageUrl != null && labeledImages[i].imageUrl != ''){
                try{
                    labeledImages[i].imageUrl = await this.storageService.getDownloadURL(labeledImages[i].imageUrl!);
                }catch(error){
                    console.log('Não foi possível obter a url da imagem: ' + error);
                    labeledImages[i].imageUrl = '';
                }
            }
            
        }
    }
}
