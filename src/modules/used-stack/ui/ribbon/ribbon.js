import { getContentModal } from '../../service/get-content.js';

function stackInit() {
    showContent();
}

function showContent() {
    const aside = document.createElement('aside');
    aside.className = 'stack';

    const titleStack = document.createElement('h2');
    titleStack.className = 'stack__title-stack';
    let textTitle = document.createTextNode('Used stack');
    titleStack.appendChild(textTitle);

    aside.appendChild(titleStack);

    const container = document.querySelector('body');
    const mainHeader = document.querySelector('.main-header');
    container.insertBefore(aside,mainHeader);

    aside.addEventListener("click", (e) => {
        //e.preventDefault();
        showModal();
    });
}

function showModal() {
    //Add class elements to show modal
    const container = document.querySelector('html');
    const body = document.querySelector('body');
    container.className = 'modal';
    body.className = 'modal-active';

    //Create and add element modal
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    container.appendChild(modalContainer);

    //Create button close modal
    const buttonClose = document.createElement('a');
    buttonClose.setAttribute('href', '#');
    buttonClose.className = 'close-btn';
    let textCloseBtn = document.createTextNode('X');
    buttonClose.appendChild(textCloseBtn);
    modalContainer.appendChild(buttonClose);

    //Add text content modal
    getContentModal();

    //Close modal
    buttonClose.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
    });
}


function closeModal() {
    // Delete classes
    const container = document.querySelector('html');
    const body = document.querySelector('body');
    container.className = '';
    body.className = '';
    // Delete modal
    const modalContainer = document.querySelector('.modal-container');
    container.removeChild(modalContainer);
}

export {
    stackInit
};