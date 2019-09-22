import SlimSelect from 'slim-select';
import 'slim-select/dist/SlimSelect.min.css';
import { getPhotosDogs } from '../modules/dogs/photos/index.js';
import { loadBreedsOptions } from '../modules/dogs/breeds/index.js';
import { stackInit } from '../modules/used-stack/index.js';
import '../../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
  stackInit();

  new SlimSelect({
    select: '#dog-selector'
  });

  loadBreedsOptions();
});

document.querySelector('#btn-submit').addEventListener('click', e => {
  e.preventDefault();
  getPhotosDogs();
});
