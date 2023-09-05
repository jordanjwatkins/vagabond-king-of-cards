import { api } from './audio'

export default class ClaimButton {
  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('claim-button-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML = '<div class="claim-strike-button"><div>Strike</div><div>Claim</div></div>'

    this.el.addEventListener('click', () => {
      console.log('claim click',)

      this.strikeClaim()
      // knote.mainGain.gain.linearRampToValueAtTime(NEAR_ZERO, knote.audioContext.currentTime + 4)

      api.fadeOut()

      setTimeout(() => {
        scene.timer.flip()
      }, 300)
    })
  }

  strikeClaim() {
    this.el.classList.add('struck')
    this.scene.claimStruck = true
  }

  unstrikeClaim() {
    this.el.classList.remove('struck')
    this.scene.claimStruck = false
  }
}
