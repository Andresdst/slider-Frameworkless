class Slider {
  constructor(selector) {
    this.move = this.move.bind(
      this
    ); /* ya que this se reescribe y cambia en js*/
    this.slider = document.querySelector(selector);
    this.itemsCount = this.slider.querySelectorAll(".container > *").length;

    this.interval = null;
    this.contador = 0;

    this.start();
    this.buildControls();
  }

  start() {
    this.interval = window.setInterval(this.move, 3000);
  }

  //crear controles dinamicamente
  buildControls() {
    for (let i = 0; i < this.itemsCount; i++) {
      let control = document.createElement("li");
      if (i == 0) control.classList.add("active");
      this.slider.querySelector(".controls ul").appendChild(control); //insertando elementos creados
    }
  }

  move() {
    this.contador++;
    if (this.contador >= this.itemsCount) this.contador = 0;
    this.moveTo(this.contador);
  }

  resetControl() {
    this.slider
      .querySelectorAll(".controls li.active")
      .forEach((element) => element.classList.remove("active"));
  }
  moveTo(index) {
    let left = index * 100;
    this.resetControl(); //para limpiar indicador
    this.slider
      .querySelector(".controls li:nth-child(" + (index + 1) + ")")
      .classList.add("active");
    this.slider.querySelector(".container").style.left = "-" + left + "%";
  }
}

(function () {
  //closure para que no haya variables globales

  new Slider(".slider");
})();
