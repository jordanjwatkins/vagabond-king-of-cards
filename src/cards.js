import Card from './card'
import { getAllCombos } from './get-all-combos'

const allCombos = getAllCombos()

const shuffle = arr => arr.sort(() => (Math.random() > 0.5 ? -1 : 1))

export default class Cards {
  cardsInPlay = []

  drawDeck = []

  constructor(parent, scene) {
    this.scene = scene
    const div = document.createElement('div')

    div.classList.add('grid-wrap')
    div.classList.add('column-direction')

    this.el = div

    parent.appendChild(div)

    this.takeTwelveWithTrinity()

    this.autoTrueTrinity()
  }

  takeTwelveWithTrinity() {
    while (!this.trinityExists()) {
      console.log('shuffled')

      shuffle(allCombos)

      const combos = allCombos.slice(-12)

      if (this.cardsInPlay) {
        this.cardsInPlay.forEach(card => card.destroy())
      }

      this.cardsInPlay = combos.map(
        combo => new Card(combo, this.el, this.onCardSelectChange)
      )
    }
  }

  replaceTrinity(trinityCards) {
    const notSelectedCards = this.cardsInPlay.filter(card => !card.selected)
    const notSelectedCombos = notSelectedCards.map(card => card.combo)

    const availableCombos = allCombos.filter(combo => !notSelectedCombos.includes(combo))

    console.log('available combos', availableCombos.length, allCombos.length)

    shuffle(availableCombos)

    const addedCombos = availableCombos.slice(-3)
    const combosInPlay = [...addedCombos, ...notSelectedCombos]

    const allTrinity = this.findAllTrinityInCombos(combosInPlay)

    if (allTrinity.length) {
      console.log('trinity exists in combos', allTrinity)

      const addedCards = trinityCards.map((trinityCard, index) => {
        const card = new Card(
          addedCombos[index],
          this.el,
          this.onCardSelectChange,
          false
        )

        // trinityCard.replace(addedCombos[index])

        console.log('parent node', trinityCard.el.parentNode.replaceChild)

        trinityCard.el.parentNode.replaceChild(card.el, trinityCard.el)

        this.cardsInPlay.splice(this.cardsInPlay.indexOf(trinityCard), 1, card)

        return card
      })

      // this.cardsInPlay = [...notSelectedCards, ...addedCards]

      console.log('find trinity', this.findAllTrinity())
    } else {
      console.log('no trinity in combos')

      return this.replaceTrinity(trinityCards)
    }

    // const cardsInPlay = this.cardsInPlay

    // const replacementCards = combos.map(combo => new )
  }

  onCardSelectChange = (updatedCard) => {
    if (!this.scene.claimStruck) return

    console.log('updaeted card', updatedCard, this.scene.claimStruck)

    if (!this.trinityExists()) {
      console.log('no trinity!!!')
    }

    let selectedCards = this.cardsInPlay.filter(card => card.selected)

    if (
      updatedCard.selected ||
      (!updatedCard.selected && selectedCards.length < 3)
    ) {
      updatedCard.toggleSelected()
    }

    selectedCards = this.cardsInPlay.filter(card => card.selected)

    if (selectedCards.length === 3) {
      if (this.isTrinity(selectedCards)) {
        console.log('true trinity!')

        updatedCard.successSound()
        this.scene.claimResults.showTrueTrinity()
        this.scene.matchInfo.updateScore(1)

        setTimeout(() => {
          this.replaceTrinity(selectedCards)
          this.scene.claimButton.unstrikeClaim()
        }, 1000)
      } else {
        console.log('false trinity!')
        setTimeout(() => {
          updatedCard.failSound()
          this.scene.claimResults.showFalseTrinity()
          this.scene.matchInfo.updateScore(-1)

          setTimeout(() => {
            this.scene.claimButton.unstrikeClaim()
            selectedCards.forEach((card) => {
              card.toggleSelected(true)
            })
          }, 300)
        }, 300)
      }
    }
  }

  isTrinity(cards) {
    const [card1, card2, card3] = cards

    const validAspects = card1.combo.filter((_value, index) => {
      const card1Prop = card1.combo[index]
      const card2Prop = card2.combo[index]
      const card3Prop = card3.combo[index]

      const allSame = card1Prop === card2Prop && card2Prop === card3Prop

      const allDifferent =
        card1Prop !== card2Prop &&
        card1Prop !== card3Prop &&
        card2Prop !== card3Prop

      return allSame || allDifferent
    })

    return validAspects.length === 4
  }

  isTrinityCombos(combos) {
    const [combo1, combo2, combo3] = combos

    const validAspects = combo1.filter((_value, index) => {
      const card1Prop = combo1[index]
      const card2Prop = combo2[index]
      const card3Prop = combo3[index]

      const allSame = card1Prop === card2Prop && card2Prop === card3Prop

      const allDifferent =
        card1Prop !== card2Prop &&
        card1Prop !== card3Prop &&
        card2Prop !== card3Prop

      return allSame || allDifferent
    })

    return validAspects.length === 4
  }

  trinityExists(cards) {
    console.log('trinity', this.findAllTrinity(cards))

    return Boolean(this.findAllTrinity(cards).length)
  }

  findAllTrinity(cardsToSearch) {
    cardsToSearch ||= this.cardsInPlay

    const possibleTrinityCombos = combinations(
      3,
      cardsToSearch.map((_value, index) => index)
    )

    return possibleTrinityCombos.filter((combo) => {
      const cards = combo.map(cardIndex => cardsToSearch[cardIndex])

      return this.isTrinity(cards)
    })
  }

  findAllTrinityInCombos(combosToSearch) {
    const possibleTrinityCombos = combinations(
      3,
      combosToSearch.map((_value, index) => index)
    )

    return possibleTrinityCombos.filter((combo) => {
      const combos = combo.map(comboIndex => combosToSearch[comboIndex])

      return this.isTrinityCombos(combos)
    })
  }

  autoTrueTrinity() {
    console.log('auto true trinity',)

    document.addEventListener('keypress', () => {
      this.scene.claimStruck = true
      console.log('auto trinity go!',)
      const trinity = this.findAllTrinity()[0]


      if (trinity) {
        console.log('trinit!!!!',)

        trinity.forEach((cardIndex) => {
          console.log('changing!!!!',)

          this.onCardSelectChange(this.cardsInPlay[cardIndex])
        })
      }
    })
  }
}

function combinations(pick, from) {
  const allCombos = []

  if (pick === 0) return allCombos

  from.forEach((item, index) => {
    if (pick === 1) {
      allCombos.push([item])

      return
    }

    const combos = combinations(pick - 1, from.slice(index + 1))

    combos.forEach((combo) => {
      allCombos.push([item, ...combo])
    })
  })

  return allCombos
}
/*
function combinationsOld(pick, from) {
  const sortedPerms = permutations(pick, from).map((item) => {
    item.sort()

    return item
  })

  const sortedPermsStringified = sortedPerms.map(perm => perm.join('-'))

  const filtered = sortedPerms.filter(
    (perm, index) => sortedPermsStringified.indexOf(perm.join('-')) === index
  )

  return filtered
}

function permutations(pick, from) {
  const allCombos = []

  if (pick === 0) return allCombos

  from.forEach((item, index) => {
    if (pick === 1) {
      allCombos.push([item])

      return
    }

    const combos = combinations(pick - 1, allBut(from, index))

    combos.forEach((combo) => {
      allCombos.push([item, ...combo])
    })
  })

  return allCombos
}

const iterationCount = 0

export function perms(items) {
  // console.log('iteration count', iterationCount)
  if (iterationCount > 100) {
    // console.log('items',)
  }

  if (!items.length) return []
  if (items.length === 1) return [...items]

  const allPerms = []

  // console.log('itsm',items)

  items.forEach((item, index) => {
    const rest = allBut(items, index)
    // console.log('perms1',rest)

    if (!rest.length) {
      console.log('bad rest', rest)
    }

    const out = perms(rest)

    out.forEach((perm, index) => {
      if (!perm.length) {
        console.log('bad perm', index, out, perm)

        perm = [perm]
      }

      allPerms.push([item, ...perm])
    })
  })

  return allPerms
}


// Create a new array while omitting a single item from source array
function allBut(array, index) {
  return array.filter((_v, k) => k !== index)
}
*/
