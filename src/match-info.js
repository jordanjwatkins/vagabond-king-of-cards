export default class MatchInfo {
  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('match-info-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML =
      '<div class="match-info"><div class="points-label">Tally</div><div class="points"></div></div>'

    this.elPoints = this.el.querySelector('.points')

    this.hide()

    // wombat move
    /*this.scene.matchPoints = 1

    this.setMatchConfig({
      matchPoints: this.scene.matchPoints,
    })*/

    /* setTimeout(() => {
      this.updateScore(1)
    }, 1000); */

    this.el.addEventListener('click', () => {})
  }

  show() {
    this.el.classList.remove('hidden')
  }

  hide() {
    this.el.classList.add('hidden')
  }

  setMatchConfig(config = {}) {
    this.matchConfig = config

    const matchPoints = config.matchPoints || 1
    const matchDivisionCount = matchPoints * 2 + 1
    const centerIndex = Math.floor(matchDivisionCount / 2)

    this.elPoints.querySelectorAll('div').forEach(el => el.remove())

    for (let i = 0; i < matchDivisionCount; i++) {
      const elPoint = document.createElement('div')

      this.elPoints.appendChild(elPoint)
    }

    const centerPoint = this.elPoints.querySelectorAll('div')[centerIndex]

    const elsPoints = this.elPoints.querySelectorAll('div')

    elsPoints.forEach(elPoint => elPoint.classList.remove('active'))

    centerPoint.classList.add('active')

    this.score = 0
    this.startOpponentWait()
  }

  updateScore(score) {
    this.lastUpdateTime = Date.now()
    clearTimeout(this.opponentUpdateTimeout)
    this.startOpponentWait()

    this.score += score

    if (score > 0) this.scene.stats.trinityCount += 1

    const { matchPoints } = this.scene

    const matchDivisionCount = matchPoints * 2 + 1
    const centerIndex = Math.floor(matchDivisionCount / 2)

    const targetIndex = centerIndex + this.score

    const elsPoints = this.elPoints.querySelectorAll('div')
    const targetPoint = elsPoints[targetIndex]

    if (!targetPoint) return

    elsPoints.forEach(elPoint => elPoint.classList.remove('active'))

    targetPoint.classList.add('active')

    document.addEventListener('keypress', (event) => {
      if (event.key === 's') console.log('press s',)

      if (event.key === 's' && !this.scene.claimBlocked) this.stealTrinity()

    })
  }

  startOpponentWait() {
    console.log('SE$T TIMEOUIT',)
    this.scene.claimBlocked = false

    clearTimeout(this.opponentUpdateTimeout)

    const { fieldSize, opponentSkill } = this.matchConfig

    const waitTime = 10 * fieldSize / opponentSkill

    console.log('wait time', waitTime)


    this.opponentUpdateTimeout = setTimeout(() => {
      this.stealTrinity()
    }, waitTime * 1000);
  }

  stopOpponentWait() {
    console.log('STOOP TIMEOUIT',)

    clearTimeout(this.opponentUpdateTimeout)
  }

  stealTrinity() {
    if (this.scene.claimBlocked) return

    console.log('YOINK',)

    if (this.scene.cards.cardsInPlay[0]) this.scene.cards.cardsInPlay[0].failSound()
    this.scene.claimResults.showStolenTrinity()
    this.updateScore(-1)

    this.scene.claimBlocked = true

    if (this.scene.matchInfo.score <= -this.scene.matchPoints) {
      this.scene.cards.loseMatch()

      return
    }

    const trinity = this.scene.cards.findAllTrinity()[0]

    if (trinity) {
      const stolenCards = trinity.map(cardIndex => this.scene.cards.cardsInPlay[cardIndex])

      setTimeout(() => {
        this.scene.cards.replaceTrinity(stolenCards)

        this.scene.claimBlocked = false

      }, 1000)
    }


  }
}
