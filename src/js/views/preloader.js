class PreloaderUI {
  constructor() {
    this.preloader = document.querySelector(".preloader");
  }

  showPreloader() {
    this.preloader.classList.remove("hidden");
  }

  hidePreloader() {
    this.preloader.classList.add("hidden");
  }
}

const preloaderUI = new PreloaderUI();

export default preloaderUI;