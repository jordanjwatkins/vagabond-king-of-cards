const sleep = duration => new Promise(resolve => setTimeout(() => resolve(), duration))

export default class Timer {
  currentT = 10

  tickSpeed = 1000

  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('timer-card-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML = '<div class="timer-card"><div class="timer-wrap"><div class="timer"><div class="timer-fg"></div></div></div></div>'

    // this.flip()
  }

  async flip() {
    this.el.classList.toggle('in')

    await sleep(500)

    this.el.classList.toggle('flip')

    setTimeout(() => {
      this.el.classList.toggle('fg-flip')
    }, 0)

    await sleep(500)

    this.el.classList.toggle('flipped')
    this.el.classList.toggle('fg-flip')

    setTimeout(() => {
      this.el.classList.toggle('flip')
      this.el.classList.toggle('flipped')
    }, 100)

    this.currentT = this.currentT === 10 ? 0 : 10

    this.setT(this.currentT)

    if (this.loop) clearInterval(this.loop)

    if (this.currentT === 0) {
      this.loop = setInterval(() => {
        if (this.currentT < 10) {
          this.currentT += 1

          this.setT(this.currentT)
        } else {
          clearInterval(this.loop)

          this.timeUp()
        }
      }, this.tickSpeed)
    } else {
      this.loop = setInterval(() => {
        if (this.currentT > 0) {
          this.currentT -= 1

          this.setT(this.currentT)
        } else {
          clearInterval(this.loop)

          this.timeUp()
        }
      }, this.tickSpeed)
    }
  }

  timeUp() {
    setTimeout(() => {
      const { cardsInPlay } = this.scene.cards
      const selectedCards = cardsInPlay.filter(card => card.selected)

      cardsInPlay[0].failSound()
      this.scene.claimResults.showMissedTrinity()
      this.scene.matchInfo.updateScore(-1)

      setTimeout(() => {
        this.scene.claimButton.unstrikeClaim()
        selectedCards.forEach((card) => {
          card.toggleSelected(true)
        })
      }, 300)
    }, 300)
  }

  reset() {
    clearInterval(this.loop)
    this.setT(10)
  }

  getT() {
    return document.documentElement.style.getProperty('--t')
  }

  setT(value) {
    this.currentT = value
    document.documentElement.style.setProperty('--t', value)
  }
}
