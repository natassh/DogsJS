import { queryApi } from './service/api.js';
import { showPhotos } from './ui/listPhotos.js';

const getPhotosDogs = async () => {
  let dogs = await queryApi();
  showPhotos(dogs);
};

export { getPhotosDogs, queryApi };
