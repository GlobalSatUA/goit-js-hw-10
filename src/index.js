import './css/styles.css';
import  debounce  from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const onInput = debounce(() => {
  const searchQuery = searchBox.value.trim();
  if (searchQuery) {
    fetchCountries(searchQuery)
      .then((countries) => {
        if (countries.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
        } else if (countries.length > 1) {
          renderCountryList(countries);
          countryInfo.innerHTML = '';
        } else {
          renderCountryInfo(countries[0]);
          countryList.innerHTML = '';
        }
      })
      .catch((error) => {
        Notiflix.Notify.failure(error.message);
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      });
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
}, 300);

const renderCountryList = (countries) => {
  countryList.innerHTML = '';
  countries.forEach((country) => {
    const { flags, name } = country;
    const countryItem = document.createElement('li');
    countryItem.innerHTML = `
      <img src="${flags.svg}" alt="Flag of ${name.official}" width="50">
      <p>${name.official}</p>
    `;
    countryList.appendChild(countryItem);
  });
};

const renderCountryInfo = (country) => {
    const { flags, name, capital, population, languages } = country;
    countryInfo.innerHTML = `
      <div>
        <img src="${flags.svg}" alt="Flag of ${name.official}" width="200">
        <h2>${name.official}</h2>
        <p><strong>Capital:</strong> ${capital[0]}</p>
        <p><strong>Population:</strong> ${population.toLocaleString()}</p>
        <p><strong>Languages:</strong> ${languages.map((lang) => lang.name).join(', ')}</p>
      </div>
    `;
  };

searchBox.addEventListener('input', onInput);
