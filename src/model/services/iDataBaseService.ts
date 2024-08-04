import { LabeledImage } from "../entities/labeledImage";

export interface IDataBaseService {
  observeImageLabels(userID: string, callback: (updatedImages: LabeledImage[]) => void): ()=>void;
}
