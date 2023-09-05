import { api } from './audio'

export default class ClaimResults {
  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('claim-results')

    this.el = div

    parent.appendChild(div)
  }

  showResult(type) {
    this.el.innerHTML = `
    <div class="results-text ${type.toLowerCase()}">
      <div>${type}</div>
      <div>Trinity</div>
    </div>
  `
    setTimeout(() => {
      this.el.classList.add('in')
    }, 100)

    setTimeout(() => {
      this.scene.timer.el.classList.remove('in')
      this.scene.timer.reset()
    }, 300)

    setTimeout(() => {
      this.el.classList.remove('in')
      api.fadeIn()

    }, 2000)
  }

  showTrueTrinity() {
    this.showResult('True')
  }

  showFalseTrinity() {
    this.showResult('False')
  }

  showMissedTrinity() {
    this.showResult('Missed')
  }

  showStolenTrinity() {
    this.showResult('Stolen')
  }
}
