async function getPhotosDogs() {
    const breedValue = document.getElementById("dog-selector").value;
    //console.log(select);
    if(breedValue === '') {
        showError();
        //console.log('funcion error');
    } else {
        //queryApi();
        let dogs = await queryApi();
        showPhotos(dogs);
        //console.log({dogs});

    }
}

function showError() {
    //console.log('funcion error');
    const alertError = document.createElement('p');
    alertError.className = 'text-error';
    const textAlertError = document.createTextNode('El campo no puede estar vacío');
    alertError.appendChild(textAlertError);
    document.querySelector('.main-content').insertBefore(alertError,document.querySelector('.list-photos'));
    // Ocultamos el mensaje despues de 2 seg
    setTimeout(function() {
        alertError.remove();
    }, 2000);
}

function queryApi() {
    const breedValue = document.getElementById("dog-selector").value;
    const endPoint = 'https://dog.ceo/api/breed/'+ breedValue +'/images/random/2';
    //console.log(endPoint);
    const responsePromise = fetch(endPoint);
    const dataResponseJsonPromise = responsePromise.then( responseObjectData => responseObjectData.json() );
    const dogs = dataResponseJsonPromise.then( dataResponse => dataResponse );
    dataResponseJsonPromise.catch( error => console.log(error) );
    return dogs;
}

function showPhotos(photos) {
    console.log(photos);
    console.log(photos.message);
    let html ='';
    photos.message.forEach(photo => {
        console.log(photo);
        html += `<img src="${photo}"/>`;
        console.log(html);
        var li = document.createElement("li"); 
        li.innerHTML = html;
        console.log(li);
        document.getElementById("list-photos").appendChild(li);
    });
}


export {
    getPhotosDogs
};



