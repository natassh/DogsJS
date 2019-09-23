import { showModal } from '../modal/modal.js';

import './styles.css';
import '../modal/styles.css';

function stackInit() {
  showRibbon();
}

function showRibbon() {
  const aside = document.createElement('aside');
  aside.className = 'stack';

  const titleStack = document.createElement('h2');
  titleStack.className = 'stack__title';
  const textTitle = document.createTextNode('Used stack');
  titleStack.appendChild(textTitle);

  aside.appendChild(titleStack);

  const container = document.querySelector('body');
  const mainHeader = document.querySelector('.main-header');
  container.insertBefore(aside, mainHeader);

  aside.addEventListener('click', e => {
    if (!document.querySelector('.modal')) {
      showModal();
    }
  });
}

export { stackInit };
