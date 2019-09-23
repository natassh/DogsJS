import { getContentModal } from '../../service/get-content.js';

function showModal() {
  const body = document.querySelector('body');

  // Create and add element modal
  const modal = document.createElement('aside');
  modal.className = 'modal';
  body.appendChild(modal);

  // Create and add modal__container
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal__container';
  modal.appendChild(modalContainer);

  // Create and add button close modal
  const buttonClose = document.createElement('a');
  buttonClose.setAttribute('href', '#');
  buttonClose.className = 'close-btn';
  const textCloseBtn = document.createTextNode('X');
  buttonClose.appendChild(textCloseBtn);
  modalContainer.appendChild(buttonClose);

  // Add text content modal
  getContentModal();

  // Close modal
  buttonClose.addEventListener('click', e => {
    e.preventDefault();
    closeModal();
  });
}

function closeModal() {
  const body = document.querySelector('body');
  const modal = document.querySelector('.modal');
  body.removeChild(modal);
}

export { showModal };
