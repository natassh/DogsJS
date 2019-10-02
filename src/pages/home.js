import { initBreedOptions } from '../modules/dogs/breeds/index.js';
import { usedStackInit } from '../modules/used-stack/index.js';
import { initLayout } from './layout/index.js';
import './home.css';

console.log('aaa2');

document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  usedStackInit();
  initBreedOptions();
});
