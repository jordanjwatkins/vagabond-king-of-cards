import { api } from './audio'

export default class ClaimButton {
  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('claim-button-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML = '<div class="claim-strike-button"><div>Strike</div><div>Claim</div></div>'

    this.hide()

    this.el.addEventListener('click', () => {
      if (this.scene.claimBlocked) return
      console.log('claim click',)

      this.strikeClaim()

      // knote.mainGain.gain.linearRampToValueAtTime(NEAR_ZERO, knote.audioContext.currentTime + 4)

      api.fadeOut()

      setTimeout(() => {
        scene.timer.flip()
      }, 300)
    })
  }

  show() {
    this.el.classList.remove('hidden')
  }

  hide() {
    this.el.classList.add('hidden')
  }

  shake() {
    this.el.classList.add('shake')

    setTimeout(() => {
      this.el.classList.remove('shake')

    }, 1000);
  }

  strikeClaim() {
    this.el.classList.add('struck')
    api.cardNoise()
    this.scene.claimStruck = true
    this.scene.cards.unlock()
    this.scene.matchInfo.stopOpponentWait()
  }

  unstrikeClaim() {
    this.el.classList.remove('struck')
    this.scene.claimStruck = false
    this.scene.cards.lock()
  }
}
