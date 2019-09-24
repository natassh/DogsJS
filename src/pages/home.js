import { getPhotosDogs } from '../modules/dogs/photos/index.js';
import { loadBreedsOptions } from '../modules/dogs/breeds/index.js';
import { stackInit } from '../modules/used-stack/index.js';
import './home.css';

document.addEventListener('DOMContentLoaded', () => {
  stackInit();
  loadBreedsOptions();
});

document.querySelector('#btn-submit').addEventListener('click', e => {
  e.preventDefault();
  getPhotosDogs();
});
