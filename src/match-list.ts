type MatchConfig = {
  matchPoints: number;
  fieldSize: number;
}

const cities = ['Constantinople', 'Florence', 'Cairo', 'Paris', 'Jerusalem', 'Angkor', 'Hangzhou', 'Kaifeng', 'York', 'Milan']
const cardsCounts = [4, 6, 9, 12]
const pointCounts = [1, 3, 5]

export default class MatchList {
  scene: any;

  el: HTMLDivElement;

  elList: HTMLDivElement;

  matches: any[];
  match: any;
  matchConfig = { fieldSize: 4, matchPoints: 1 };

  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('match-list-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML =
      `<div class="heading"><div>Duel</div> <div>Choices</div></div>
      <div class="match-list"></div>
      <div class="match-options-wrap">
        <div class="match-options">
          <div class="match-options-label">Cards</div>
          <div class="match-options-cards"></div>

          <div class="match-options-label">Points</div>
          <div class="match-options-points"></div>

          <div class="match-options-confirm">Confirm</div>
        </div>
      </div>`

    this.elList = this.el.querySelector('.match-list')!
    this.elOptions = this.el.querySelector('.match-options-wrap')!
    this.elOptionsCards = this.el.querySelector('.match-options-cards')!
    this.elOptionsPoints = this.el.querySelector('.match-options-points')!
    this.elOptionsConfirm = this.el.querySelector('.match-options-confirm')!

    this.elOptions.classList.add('hidden')

    const elsCount = cardsCounts.map((count) => {
      const elCount = document.createElement('div')

      elCount.innerText = count.toString()

      this.elOptionsCards.appendChild(elCount)

      elCount.addEventListener('click', () => {
        elsCount.forEach(el => el.classList.remove('active'))
        elCount.classList.add('active')
        this.matchConfig.fieldSize = count
      })

      return elCount;
    })

    elsCount[0].classList.add('active')

    const elsPoint = pointCounts.map((count, index) => {
      const elCount = document.createElement('div')

      elCount.innerText = count.toString()

      this.elOptionsPoints.appendChild(elCount)

      elCount.addEventListener('click', () => {
        elsPoint.forEach(el => el.classList.remove('active'))
        elCount.classList.add('active')
        this.matchConfig.matchPoints = count;
      })

      return elCount;
    })

    elsPoint[0].classList.add('active')

    this.elOptionsConfirm.addEventListener('click', () => {
      this.match.init(this.scene)
    })

    //this.hide()

    this.updateMatches(initMatches())

    this.el.addEventListener('click', () => {})
  }

  updateMatches(matches) {
    this.matches = matches

    this.matches.forEach((match, index) => {
      const elMatch = document.createElement('div')

      elMatch.innerHTML = match.labelText

      this.elList.appendChild(elMatch)

      elMatch.addEventListener('click', () => {
        this.match = match

        if (match.optionsSelect) {
          this.elOptions.classList.remove('hidden')
        } else {
          match.init(this.scene)
        }
      })
    })
  }

  show() {
    this.el.classList.remove('hidden')
    this.elOptions.classList.add('hidden')
  }

  hide() {
    this.el.classList.add('hidden')
  }

  showOptions() {

  }

  initMatch(matchConfig: MatchConfig) {
    this.scene.wheel.show()
    //this.scene.questsButton.hide()

    setTimeout(() => {
      this.scene.wheel.hide()
      this.scene.cards.takeNWithTrinity(matchConfig.fieldSize)
      cardsCounts.forEach(cardCount => this.scene.cards.el.classList.remove(`fs-${cardCount}`))
      this.scene.cards.el.classList.add(`fs-${matchConfig.fieldSize}`)
      this.scene.cards.show()

      this.scene.claimButton.unstrikeClaim()
      this.scene.claimButton.show()
      this.scene.matchInfo.show()

      this.scene.matchPoints = matchConfig.matchPoints
      this.scene.matchInfo.setMatchConfig(matchConfig)
    }, 2000);
  }
}

function initMatches() {
  return [
    {
      labelText: 'Training 1: Seeing the light',
      optionsSelect: false,
      init(scene) {
        scene.matchList.initMatch({
          matchPoints: 1,
          fieldSize: 3
        })
        scene.matchList.hide()
      },
    },
    {
      labelText: 'Training 2: The light in the dark',
      init(scene) {
        scene.matchList.initMatch({
          matchPoints: 3,
          fieldSize: 4
        })
        scene.matchList.hide()
        this.startTime = Date.now()
      },
    },
    {
      labelText: 'Spar with a local fool',
      optionsSelect: true,
      init(scene) {
        scene.matchList.initMatch({
          opponentSkill: 1,
          ...scene.matchList.matchConfig
        })
        scene.matchList.hide()
      },
    },
    {
      labelText: 'Duel: Novice',
      optionsSelect: true,
      init(scene) {
        scene.matchList.initMatch({
          opponentSkill: 2,
          ...scene.matchList.matchConfig
        })
        scene.matchList.hide()
      },
    },
    {
      labelText: 'Duel: Adept',
      optionsSelect: true,
      init(scene) {
        scene.matchList.initMatch({
          opponentSkill: 3,
          ...scene.matchList.matchConfig
        })
        scene.matchList.hide()
      },
    },
    {
      labelText: 'Duel: Master',
      optionsSelect: true,
      init(scene) {
        scene.matchList.initMatch({
          opponentSkill: 4,
          ...scene.matchList.matchConfig
        })
        scene.matchList.hide()
      },
    },
    {
      labelText: 'Challenge the King',
      optionsSelect: true,
      init(scene) {
        scene.matchList.initMatch({
          opponentSkill: 5,
          ...scene.matchList.matchConfig
        })
        scene.matchList.hide()
      },
      onWin(scene) {
        scene.gameWon.show(scene.matchList.matchConfig.fieldSize)
      }
    },
  ]
}
