export default class Renown {
  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('renown-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML =
      '<div class="renown">R: <div class="r-value"></div></div>'

    this.elRValue = this.el.querySelector('.r-value')

    this.rValue = 0
    this.elRValue.innerText = this.rValue
  }

  updateR() {}

  show() {
    this.el.classList.remove('hidden')
  }

  hide() {
    this.el.classList.add('hidden')
  }
}
