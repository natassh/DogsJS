import { showBreedsInSelect } from '../UI/toShowBreeds.js';

async function loadBreedsOptions() {
    const endPoint = 'https://dog.ceo/api/breeds/list/all';
    const responsePromise = fetch(endPoint);
    const dataResponseJsonPromise = responsePromise.then( responseObjectData => responseObjectData.json() );
    const breedsObject = await dataResponseJsonPromise.then( dataResponse => dataResponse );
    dataResponseJsonPromise.catch( error => console.log(error) );
    showBreedsInSelect(breedsObject);
}

export {
    loadBreedsOptions
};