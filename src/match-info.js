export default class MatchInfo {
  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('match-info-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML = '<div class="match-info"><div class="points-label">Tally</div><div class="points"></div></div>'

    this.elPoints = this.el.querySelector('.points')

    // wombat move
    this.scene.matchPoints = 1

    this.setMatchConfig({
      matchPoints: this.scene.matchPoints
    })

    /*setTimeout(() => {
      this.updateScore(1)
    }, 1000);*/

    this.el.addEventListener('click', () => {

    })
  }

  setMatchConfig(config = {}) {
    const matchPoints = config.matchPoints || 1
    const matchDivisionCount = matchPoints * 2 + 1
    const centerIndex = Math.floor(matchDivisionCount / 2)

    for (let i = 0; i < matchDivisionCount; i++) {
      const elPoint = document.createElement('div')

      this.elPoints.appendChild(elPoint)
    }

    const centerPoint = this.elPoints.querySelectorAll('div')[centerIndex]

    centerPoint.classList.add('active')
  }

  updateScore(score) {
    const { matchPoints } = this.scene

    const matchDivisionCount = matchPoints * 2 + 1
    const centerIndex = Math.floor(matchDivisionCount / 2)

    const targetIndex = centerIndex + score

    const elPoints = this.elPoints.querySelectorAll('div')
    const targetPoint = elPoints[targetIndex]

    elPoints.forEach(elPoint => elPoint.classList.remove('active'))

    targetPoint.classList.add('active')
  }
}
