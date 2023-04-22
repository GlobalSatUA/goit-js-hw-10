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
      data.forEach((country) => {
        
        if (!Array.isArray(country.languages)) {
          const langArray = [];
          for (const [key, value] of Object.entries(country.languages)) {
            langArray.push({ name: value });
          }
          country.languages = langArray;
        }
        
        if (country.languages.length === 0) {
          country.languages = [{ name: 'Unknown' }];
        }
      });
      return data;
    });
};
