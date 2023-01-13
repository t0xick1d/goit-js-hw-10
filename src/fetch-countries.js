export default function getCountryFetch(currentValueInput) {
  return fetch(`https://restcountries.com/v3.1/name/${currentValueInput}`)
    .then(res => {
      if (!res.ok) {
        throw new Error();
      }
      return res;
    })
    .then(res => res.json());
}
