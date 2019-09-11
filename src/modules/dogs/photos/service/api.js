function queryApi() {
    const breedValue = document.getElementById("dog-selector").value;
    const endPoint = 'https://dog.ceo/api/breed/'+ breedValue +'/images/random/25';
    //console.log(endPoint);
    const responsePromise = fetch(endPoint);
    const dataResponseJsonPromise = responsePromise.then( responseObjectData => responseObjectData.json() );
    const dogs = dataResponseJsonPromise.then( dataResponse => dataResponse );
    dataResponseJsonPromise.catch( error => console.log(error) );
    return dogs;
}

export {
    queryApi
};