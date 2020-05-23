class IndexForSiblings {
  static get(el) {
    let children = el.parentNode.children;

    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (child == el) return i;
    }
  }
}

class Slider {
  constructor(selector) {
    this.move = this.move.bind(
      this
    ); /* ya que this se reescribe y cambia en js*/
    this.moveByButton = this.moveByButton.bind(this);
    this.slider = document.querySelector(selector);
    this.itemsCount = this.slider.querySelectorAll(".container > *").length;

    this.interval = null;
    this.contador = 0;

    this.start();
    this.buildControls();
    this.bindEvent();
  }

  start() {
    this.interval = window.setInterval(this.move, 3000);
  }

  bindEvent() {
    this.slider.querySelectorAll(".controls li").forEach((element) => {
      element.addEventListener("click", this.moveByButton);
    });
  }

  moveByButton(ev) {
    //evento que paso el eventListener
    let index = IndexForSiblings.get(ev.currentTarget);
    this.contador = index;
    this.moveTo(index);

    if (this.interval) window.clearInterval(this.interval);
    this.start();
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
