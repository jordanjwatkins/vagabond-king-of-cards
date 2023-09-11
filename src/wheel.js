export default class Wheel {
  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('wheel-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML =
      '<div class="wheel"></div>'

    this.elWheel = this.el.querySelector('.wheel')

    this.elWheel.innerHTML = '<div class="wheel-card"><div class="travel-text">Traveling yonder...</div></div>'

    this.hide()

    this.el.addEventListener('click', () => {
      this.scene.cards.takeNWithTrinity(9)
      this.scene.cards.show()
      this.scene.claimButton.show()
      this.scene.claimButton.unstrikeClaim()
      this.scene.matchInfo.show()

      this.scene.matchPoints = 2
      this.scene.matchInfo.setMatchConfig({
        matchPoints: 2
      })

      setTimeout(() => {
        this.hide()
      }, 500)
    })
  }

  show() {
    this.el.classList.remove('hidden')
  }

  hide() {
    this.el.classList.add('hidden')
  }
}
