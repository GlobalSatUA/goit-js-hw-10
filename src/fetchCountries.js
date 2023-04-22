export const fetchCountries = (name) => {
    const BASE_URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  
    return fetch(BASE_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Oops, there is no country with that name');
      })
      .then((data) => {
        // Make sure languages is always an array
        data.forEach((country) => {
          if (!Array.isArray(country.languages)) {
            country.languages = [country.languages];
          }
        });
        return data;
      });
  };
  