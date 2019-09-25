import { getPhotosDogs } from '../../modules/dogs/photos/index.js';
import { str2DOMElement } from '../../modules/used-stack/utils/str2DOMElement.js';

const initLayout = () => {
  const xmlString = str2DOMElement(`
  <section class="home">
      <header class="logo">
      <h1 class="logo__title">Razas de perros</h1>
      <figure class="logo__picture">
        <img src="images/huella2.png" />
      </figure>
    </header>
    <main class="main-content">
      <form class="form">
        <label for="dog-selector" class="form__label">Elige la raza:</label>
        <select id="dog-selector" class="form__select"> </select>
        <input
          type="submit"
          id="btn-submit"
          value="Pulsa para mostrar"
          class="form__btn-submit"
        />
      </form>
    </main>
  </section>`);
  document.querySelector('#app').appendChild(xmlString);
  document.querySelector('#btn-submit').addEventListener('click', e => {
    e.preventDefault();
    getPhotosDogs();
  });
};

export { initLayout };
