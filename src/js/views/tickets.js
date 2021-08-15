import currencyUI from "./currency";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".main__container");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();

    if(!tickets.length) {
      this.showEmptyMessage();
      return;
    }

    let fragment = "";
    const symbol = this.getCurrencySymbol();

    tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, symbol);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMessage() {
    this.container.insertAdjacentHTML("afterbegin", TicketsUI.emptyMsgTemplate());
  }

  static emptyMsgTemplate() {
    return `
      <div class="main__emptyMessage">
        По вашему запросу билетов не найдено
      </div>
    `;
  }

  static ticketTemplate(ticket, symbol) {
    return `
      <div class="ticket">
        <div class="ticket__header">
          <img src="${ticket.airline_logo}" alt="#" class="ticket__img">
          <div class="ticket__title">${ticket.airline_name}</div>
        </div>

        <div class="ticket__body">
          <div class="body__origin">${ticket.origin_name}</div>
          <div class="body__destination">${ticket.destination_name}</div>
        </div>

        <div class="ticket__datePrice">
          <div class="datePrice__date">${ticket.departure_at}</div>
          <div class="datePrice__price">${symbol}${ticket.price}</div>
        </div>

        <div class="ticket__info">Пересадок: ${ticket.transfers} Номер рейса: ${ticket.flight_number}</div>
      </div>
    `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;