import { FirebaseDatabaseService } from "../model/services/FirebaseDataBaseService";
import { FirebaseAuthService } from "../model/services/firebaseAuthService";
import { FirebaseStorageService } from "../model/services/firebaseStorageService";
import { IAuthService } from "../model/services/iAuthService";
import { IDataBaseService } from "../model/services/iDataBaseService";
import { IStorageService } from "../model/services/iStorageService";
import { LabelsController } from "./labelsController";
import { LoginController } from "./loginController";
import { UploadImgController } from "./uploadImgController";

const authService: IAuthService = new FirebaseAuthService();
const storageService: IStorageService = new FirebaseStorageService();
const dataBaseService : IDataBaseService = new FirebaseDatabaseService(storageService);

export const loginController: LoginController = new LoginController(authService);
export const uploadImgController: UploadImgController = new UploadImgController(storageService, authService);
export const labelsController : LabelsController = new LabelsController(authService,dataBaseService);

