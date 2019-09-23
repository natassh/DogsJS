import { showBreedsInSelect } from '../ui/optionsBreeds.js';

async function loadBreedsOptions() {
  const endPoint = 'https://dog.ceo/api/breeds/list/all';
  const responsePromise = fetch(endPoint);
  const dataResponseJsonPromise = responsePromise.then(responseObjectData =>
    responseObjectData.json()
  );
  const breedsObject = await dataResponseJsonPromise.then(
    dataResponse => dataResponse
  );
  /* eslint-disable no-console */
  dataResponseJsonPromise.catch(error => console.log(error));
  showBreedsInSelect(breedsObject);
}

export { loadBreedsOptions };
