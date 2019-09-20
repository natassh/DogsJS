import { str2DOMElement } from '../utils/str2DOMElement.js';

function getContentModal() {
    fetch('./src/modules/used-stack/assets/content.html')
    .then(response => response.text())
    .then(text => {
        var xmlString =  str2DOMElement(text);
         
        document.querySelector(".modal-container").appendChild(xmlString);
        // document.querySelector('#aafdsasdd').addEventListener("click", (e) => {
        //     e.preventDefault();
        //     console.log('aa');
        // });
    });
}

export {
    getContentModal
};