function showError() {
    //console.log('funcion error');
    const alertError = document.createElement('p');
    alertError.className = 'text-error';
    const textAlertError = document.createTextNode('El campo no puede estar vacío');
    alertError.appendChild(textAlertError);
    document.querySelector('.main-content').insertBefore(alertError,document.querySelector('.list-photos'));
    const select = document.getElementById("dog-selector");
    select.className += ' error';
    // Ocultamos el mensaje despues de 2 seg
    setTimeout(function() {
        alertError.remove();
        select.classList.remove('error');
    }, 2000);
}


function showPhotos(photos) {
    document.getElementById("list-photos").innerHTML = '';
    photos.message.forEach(photo => {
        let html ='';
        html += `<img src="${photo}"/>`;
        let li = document.createElement("li"); 
        li.innerHTML = html;
        document.getElementById("list-photos").appendChild(li);
    });
}

export {
    showError,
    showPhotos
};