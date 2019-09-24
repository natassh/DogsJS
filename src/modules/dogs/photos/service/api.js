const getDogsPhotosByBreedName = breedValue => {
  const endPoint =
    'https://dog.ceo/api/breed/' + breedValue + '/images/random/25';
  const responsePromise = fetch(endPoint);
  const dataResponseJsonPromise = responsePromise.then(responseObjectData =>
    responseObjectData.json()
  );
  const dogs = dataResponseJsonPromise.then(dataResponse => dataResponse);
  dataResponseJsonPromise.catch(error => error);
  return dogs;
};

export { getDogsPhotosByBreedName };
