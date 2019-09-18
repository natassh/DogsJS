import { getPhotosDogs } from '../modules/dogs/photos/index.js';
import { loadBreedsOptions } from '../modules/dogs/breeds/index.js';
import '../../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
    /*
    new SlimSelect({
        select: '#dog-selector'
      })
      */
     //customSelect(document.getElementById('dog-selector'));
        
    loadBreedsOptions();


    fetch('/src/pages/content.html')
    .then(response => response.text())
    .then(text => {
        var xmlString =  str2DOMElement(text);
         
        document.getElementById("carousel").appendChild(xmlString);
        document.querySelector('#aafdsasdd').addEventListener("click", (e) => {
            e.preventDefault();
            console.log('aa');
        });
    });
});

document.querySelector('#btn-submit').addEventListener("click", (e) => {
    e.preventDefault();
    getPhotosDogs();
});


var str2DOMElement = function(html) {
    var frame = document.createElement('iframe');
    frame.style.display = 'none';
    document.body.appendChild(frame);             
    frame.contentDocument.open();
    frame.contentDocument.write(html);
    frame.contentDocument.close();
    var el = frame.contentDocument.body.firstChild;
    document.body.removeChild(frame);
    return el;
}