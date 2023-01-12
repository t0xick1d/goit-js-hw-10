export default function getCountryFetch(currentValueInput) {
  return fetch(`https://restcountries.com/v3.1/name/${currentValueInput}`)
    .then(res => res.json())
    .then(res => {
      if (res.status === 404 && res.message === 'Not Found') {
        throw new Error();
      }
      return res;
    });
}
