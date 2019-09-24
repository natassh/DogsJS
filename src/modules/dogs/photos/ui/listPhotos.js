import Carousel from 'marvina-carousel';
import './listPhotos.css';

const showPhotos = photos => {
  document.querySelector('.list-photos').innerHTML = '';
  photos.message.forEach(photo => {
    let html = '';
    html += `<img src="${photo}"/>`;
    let figure = document.createElement('figure');
    figure.className = 'mc-carousel-element';
    figure.innerHTML = html;
    document.querySelector('.list-photos').appendChild(figure);
  });

  const carousel = new Carousel({
    el: '#carousel',
    minImage: 2
  });
};

export { showPhotos };
