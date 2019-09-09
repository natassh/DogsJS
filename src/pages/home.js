
import { getPhotosDogs } from '../modules/list/list.js';

document.querySelector('#btn-submit').addEventListener("click", (e) => {
    e.preventDefault();
    getPhotosDogs();
});