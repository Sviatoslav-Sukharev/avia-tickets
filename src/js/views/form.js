class FormUI {
  constructor() {
    this._form = document.forms["form"];
    this.origin = document.querySelector(".form__origin");
    this.destination = document.querySelector(".form__destination");
    this.depart = document.querySelector(".form__departDate");
    this.return = document.querySelector(".form__returnDate");
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departValue() {
    return this.depart.value;
  }

  get returnValue() {
    return this.return.value;
  }
}

const formUI = new FormUI();

export default formUI;