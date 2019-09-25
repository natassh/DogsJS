import Carousel from 'marvina-carousel';
import './listPhotos.css';

const showPhotos = photos => {
  createAndAddSectionContainer();
  document.querySelector('.list-photos').innerHTML = '';
  showPhotosInPage(photos);
};

const createAndAddSectionContainer = () => {
  const sectionContainer = document.createElement('section');
  sectionContainer.id = 'carousel';
  sectionContainer.className = 'list-photos';
  document.querySelector('.main-content').appendChild(sectionContainer);
};

const showPhotosInPage = photos => {
  photos.message.forEach(photo => {
    let html = '';
    html += `<img src="${photo}"/>`;
    let figure = document.createElement('figure');
    figure.className = 'mc-carousel-element';
    figure.innerHTML = html;
    document.querySelector('.list-photos').appendChild(figure);
  });

  initPluginCarousel();
};

const initPluginCarousel = () => {
  const carousel = new Carousel({
    el: '#carousel',
    minImage: 2
  });
};

export { showPhotos };
