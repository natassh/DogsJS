import { getPhotosDogs } from '../modules/dogs/photos/index.js';
import { loadBreedsOptions } from '../modules/dogs/breeds/index.js';
import { usedStackInit } from '../modules/used-stack/index.js';
import './home.css';

document.addEventListener('DOMContentLoaded', () => {
  usedStackInit();
  loadBreedsOptions();
});

document.querySelector('#btn-submit').addEventListener('click', e => {
  e.preventDefault();
  getPhotosDogs();
});
