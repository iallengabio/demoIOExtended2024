import { labelsController, loginController, uploadImgController } from "../controller/dipControllers";
import ui from 'beercss';
import { LabeledImage } from "../model/entities/labeledImage";
import { User } from "../model/entities/user";

const rotulationButton = document.getElementById('rotulationButton') as HTMLButtonElement;
const imgInput = document.getElementById('imgInput') as HTMLInputElement;// Cria uma instância do controller

rotulationButton.addEventListener('click', async () => {
  const file = imgInput.files?.[0];

  if (!file) {
    alert('Por favor, selecione uma imagem.');
    return;
  }

  rotulationButton.disabled = true;
  rotulationButton.getElementsByTagName('span')[0].textContent = 'Enviando...';
  rotulationButton.getElementsByTagName('i')[0].textContent = 'sync';

  try {
    await uploadImgController.uploadImg(file);
    //alert('Imagem enviada para rotulação com sucesso!');
    //snackImgUploadSuccess
    ui("#snackImgUploadSuccess", 2000);
  } catch (error) {
    alert('Erro ao enviar a imagem: ' + error);
  } finally {
    rotulationButton.disabled = false;
    rotulationButton.getElementsByTagName('span')[0].textContent = 'Rotular';
    rotulationButton.getElementsByTagName('i')[0].textContent = 'cloud_upload';
  }
  imgInput.value = '';
});

function createImageCard(labeledImage: LabeledImage): HTMLElement {
  const imageCard = document.createElement('div');
  imageCard.classList.add('s12', 'm6', 'l4');

  const article = document.createElement('article');
  article.classList.add('no-padding');
  imageCard.appendChild(article);

  const grid = document.createElement('div');
  grid.classList.add('grid', 'no-space');
  article.appendChild(grid);

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('s6');
  grid.appendChild(imageContainer);

  const image = document.createElement('img');
  image.classList.add('responsive');
  image.src = labeledImage.imageUrl || 'https://via.placeholder.com/150'; // Set default image if imageUrl is null
  imageContainer.appendChild(image);

  const labelContainer = document.createElement('div');
  labelContainer.classList.add('s6', 'small-padding');
  grid.appendChild(labelContainer);

  const labelTitle = document.createElement('h5');
  labelTitle.classList.add('center-align');
  labelTitle.textContent = 'Rótulos';
  labelContainer.appendChild(labelTitle);

  const labelsFragment = document.createDocumentFragment();
  labeledImage.labels.forEach((label) => {
    const labelChip = document.createElement('a');
    labelChip.classList.add('chip', 'small-margin');
    labelChip.textContent = label;
    labelsFragment.appendChild(labelChip);
  });
  labelContainer.appendChild(labelsFragment);

  return imageCard;
}

const imageGrid = document.getElementById('gridImageLabels');

loginController.onAuthStateChange((user:User|null)=>{
  if(user){
    labelsController.observeImageLabels((labeledImages:LabeledImage[])=>{
      imageGrid!.innerHTML = '';
      labeledImages.forEach((labeledImage:LabeledImage)=>{
        imageGrid!.append(createImageCard(labeledImage));
      });
    });
  }
});



