export class LabeledImage {
    imageUrl: string | null;
    labels: string[];
    createdAt: Date;
  
    constructor(imageUrl: string, labels: string[]) {
      this.imageUrl = imageUrl;
      this.labels = labels;
      this.createdAt = new Date();
    }
}
  