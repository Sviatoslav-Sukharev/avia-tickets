class CurrencyUI {
  constructor() {
    this.currency = document.querySelector(".currency__select");
    this.dictionary = {
      USD: "$",
      EUR: "€",
    }
  }

  get currencyValue() {
    return this.currency.value;
  }

  getCurrencySymbol() {
    return this.dictionary[this.currencyValue];
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;