async function loadBreedsOptions() {
    const endPoint = 'https://dog.ceo/api/breeds/list/all';
    const responsePromise = fetch(endPoint);
    const dataResponseJsonPromise = responsePromise.then( responseObjectData => responseObjectData.json() );
    const breedsObject = await dataResponseJsonPromise.then( dataResponse => dataResponse );
    dataResponseJsonPromise.catch( error => console.log(error) );
    showBreedsInSelect(breedsObject);
}

function showBreedsInSelect(breedsObject) {
    const breeds = Object.keys(breedsObject.message)
    breeds.forEach(breed => {
        let html ='';
        html += `${breed}`;
        let option = document.createElement("option"); 
        option.setAttribute("value",breed);
        option.innerHTML = html;
        document.getElementById("dog-selector").appendChild(option);
    });
}

export {
    loadBreedsOptions
};

