import customSelect from 'custom-select';

function showBreedsInSelect(breedsObject) {
  const breeds = Object.keys(breedsObject.message);
  const mySelect = customSelect(document.getElementById('dog-selector'));
  breeds.forEach(breed => {
    let html = '';
    html += `${breed}`;
    let option = document.createElement('option');
    option.setAttribute('value', breed);
    option.innerHTML = html;
    document.getElementById('dog-selector').appendChild(option);
  });
}

export { showBreedsInSelect };
