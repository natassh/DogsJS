import SlimSelect from 'slim-select';

const showBreedsInSelect = breedsObject => {
  new SlimSelect({
    select: '#dog-selector'
  });
  const breeds = Object.keys(breedsObject.message);
  breeds.forEach(breed => {
    let html = '';
    html += `${breed}`;
    let option = document.createElement('option');
    option.setAttribute('value', breed);
    option.innerHTML = html;
    document.getElementById('dog-selector').appendChild(option);
  });
};

export { showBreedsInSelect };
