
import { LabeledImage } from "../model/entities/labeledImage";
import { IAuthService } from "../model/services/iAuthService";
import { IDataBaseService } from "../model/services/iDataBaseService";

export class LabelsController{
    authService : IAuthService;
    dataBaseService: IDataBaseService;
    unsubscribeLabels:(()=>void)|null = null;

    constructor(authService : IAuthService, dataBaseService: IDataBaseService){
        this.authService = authService;
        this.dataBaseService = dataBaseService;

        authService.onAuthStateChanged((user)=>{
            if(user==null){
                this.stopObserveImageLabels();
            }
        })
    }

    observeImageLabels(callback: (updatedImages: LabeledImage[]) => void): void{
        this.stopObserveImageLabels();
        const uid = this.authService.getUserID();
        if(uid!=null){
            this.dataBaseService.observeImageLabels(uid,callback);
        }else{
            throw Error('usuário precisa estar logado para observar imageLabels.');
        }
    }

    stopObserveImageLabels():void{
        if(this.unsubscribeLabels){
            this.unsubscribeLabels();
        }
    }
}