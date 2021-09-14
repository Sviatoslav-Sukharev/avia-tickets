import locations from "./store/locations"
import "../css/style.css";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import preloaderUI from "./views/preloader";

document.addEventListener("DOMContentLoaded", (e) => {
  initApp();
  const form = formUI.form;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  async function initApp() {
    await locations.init();
    locations.autocompleteInit();
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const departDate = formUI.departValue.slice(0, 7);
    const returnDate = formUI.returnValue.slice(0, 7);
    const currency = currencyUI.currencyValue;
    console.log(origin, destination, departDate, returnDate, currency);

    if(origin && destination && departDate) {
      preloaderUI.showPreloader();
      await locations.fetchTickets({
        origin,
        destination,
        departDate,
        returnDate,
        currency,
      });

      console.log(locations.lastSearch);
      ticketsUI.renderTickets(locations.lastSearch);
      preloaderUI.hidePreloader();
    } else {
      ticketsUI.clearContainer();
      ticketsUI.showEmptyMessage();
    }
  }
});