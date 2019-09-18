import { queryApi } from './service/api.js';
import { showError } from './ui/listPhotos.js';
import { showPhotos } from './ui/listPhotos.js';

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