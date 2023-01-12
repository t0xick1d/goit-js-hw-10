import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getCountryFetch from './fetch-countries';
import './css/styles.css';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputElement = document.querySelector('#search-box');
const listCountriesriElement = document.querySelector('.country-list');
const currendFindCountryCard = document.querySelector('.country-info');

inputElement.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const currentValueInput = e.target.value;

  getCountryFetch(currentValueInput)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length <= 10 && data.length >= 2) {
        cleanSearch();
        MarkUpList(data);
        return;
      }
      if (data.length === 1) {
        cleanSearch();
        MarkUpActualCountry(data);
        return;
      }
    })
    .catch(() => {
      cleanSearch();
      Notify.failure('Oops, there is no country with that name');
    });
}

function cleanSearch() {
  listCountriesriElement.innerHTML = '';
  currendFindCountryCard.innerHTML = '';
}
function MarkUpList(data) {
  listCountriesriElement.innerHTML = data
    .map(({ flags, name }) => {
      return `<li>
            <img src=${flags.svg} width='50'/>
            ${name.common}
            </li>`;
    })
    .join(' ');
}
function MarkUpActualCountry(data) {
  currendFindCountryCard.innerHTML = data
    .map(element => {
      const langs = Object.values(element.languages).join(', ');
      const capitals = element.capital.join(', ');
      return `
              <div><img src=${element.flags.svg} width='40'/> ${element.name.common}</div>
              <div>Capital: ${capitals}</div>
              <div>Population: ${element.population}</div>
              <div>Language: ${langs}</div>
            `;
    })
    .join(' ');
}
