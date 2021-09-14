import api from "../services/apiService";

class Location {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.airlines = null;
    this.lastSearch = null;
    this.fullNames = null;
  }

  async init() {
    const response = await Promise.all([this.api.countries(), this.api.cities(), this.api.airlines()]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries || {});
    this.cities = this.serializeCities(cities || {});
    this.airlines = this.serializeAirlines(airlines || {});
    this.fullNames = this.getFullNames();

    return response;
  }

  serializeCountries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    return cities.reduce((acc, city) => {
      const countryName = this.getCountryByCode(city.country_code);
      const fullName = `${city.name},${countryName}`;
      acc[city.code] = {
        ...city,
        countryName,
        fullName,
      };
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, airline) => {
      airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`;
      airline.name = airline.name || airline.name_translations.en;
      acc[airline.code] = airline;
      return acc;
    }, {});
  }

  getAirlineNameByCode(code) {
    if(!this.airlines[code]) return "Не удалось определить авиакомпанию";
    return this.airlines[code].name;
  }

  getAirlineLogoByCode(code) {
    if(!this.airlines[code]) return "https://pbs.twimg.com/profile_images/1099958605925691397/JM1TI2_-_400x400.png";
    return this.airlines[code].logo;
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find((city) => city.fullName === key) || {};
    return city.code;
  }

  getFullNames() {
    const fullNames = Object.values(this.cities).map(city => city.fullName);
    return fullNames;
  }

  autocompleteInit() {
    $(".form__origin").autocomplete({
      source: this.fullNames,
    });
    $(".form__destination").autocomplete({
      source: this.fullNames,
    });
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getCountryByCode(code) {
    return this.countries[code].name;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map((ticket) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at: ticket.departure_at.slice(0, 10) + " " + ticket.departure_at.slice(12, 16),
        return_at: ticket.return_at.slice(0, 10) + " " + ticket.return_at.slice(12, 16),
      }
    });
  }
}

const locations = new Location(api);

export default locations;