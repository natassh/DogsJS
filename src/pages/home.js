
import { getPhotosDogs } from '../modules/list/list.js';
import { loadBreedsOptions } from '../modules/data/options-data.js';

document.addEventListener('DOMContentLoaded', () => {
    loadBreedsOptions();

    var xmlString = str2DOMElement('<div id="foo"><a href="#" id="aafdsasdd">Link</a><span></span></div>');
    //console.log(xmlString);

    document.getElementById("list-photos").appendChild(xmlString);
    document.querySelector('#aafdsasdd').addEventListener("click", (e) => {
        e.preventDefault();
        console.log('aa');
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