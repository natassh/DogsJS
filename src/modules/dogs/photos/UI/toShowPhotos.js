// import Carousel from 'https://cdn.pika.dev/marvina-carousel/v1';
import Carousel from 'marvina-carousel';

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
    document.querySelector(".list-photos").innerHTML = '';
    photos.message.forEach(photo => {
        let html ='';
        html += `<img src="${photo}"/>`;
        let figure = document.createElement("figure"); 
        figure.className = 'mc-carousel-element';
        figure.innerHTML = html;
        document.querySelector(".list-photos").appendChild(figure);
    });

    const carousel = new Carousel({
        el: '#carousel',
        minImage: 2
    });
}

export {
    showError,
    showPhotos
};