import { queryApi } from './service/api.js';
import { showError } from './UI/toShowPhotos.js';
import { showPhotos } from './UI/toShowPhotos.js';

async function getPhotosDogs() {
    const breedValue = document.getElementById("dog-selector").value;
    if(breedValue === '') {
        showError();
    } else {
        let dogs = await queryApi();
        showPhotos(dogs);

    }
}

export {
    getPhotosDogs,
    queryApi
};