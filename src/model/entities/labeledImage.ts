export class LabeledImage {
  imageUrl: string | null;
  labels: Map<string, string[]>;
  createdAt: Date;

  constructor(imageUrl: string, labels: Map<string, string[]>) {
      this.imageUrl = imageUrl;
      this.labels = labels;
      this.createdAt = new Date();
  }
}
  