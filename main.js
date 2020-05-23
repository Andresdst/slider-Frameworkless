class Slider {
  constructor(selector) {
    this.move = this.move.bind(
      this
    ); /* ya que this se reescribe y cambia en js*/
    this.slider = document.querySelector(selector);
    this.interval = null;
    this.contador = 0;
    this.start();
  }

  start() {
    this.interval = window.setInterval(this.move, 3000);
  }

  move() {
    let itemsCount = this.slider.querySelectorAll(".container>*").length;
    this.contador++;
    if (this.contador >= itemsCount) this.contador = 0;
    this.moveTo(this.contador);
  }

  moveTo(index) {
    let left = index * 100;
    this.slider.querySelector(".container").style.left = "-" + left + "%";
  }
}

(function () {
  //closure para que no haya variables globales

  new Slider(".slider");
})();
