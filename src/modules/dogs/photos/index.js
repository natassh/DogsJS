import { getDogsPhotosByBreedName } from './service/api.js';
import { showPhotos } from './ui/listPhotos.js';

const getPhotosDogs = async () => {
  const breedValue = document.getElementById('dog-selector').value;
  let dogs = await getDogsPhotosByBreedName(breedValue);
  showPhotos(dogs);
};

export { getPhotosDogs, getDogsPhotosByBreedName };
