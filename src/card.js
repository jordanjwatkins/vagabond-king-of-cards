import { knote } from './libs/JamKnote'
import shuffle from './shuffle'

export default class Card {
  constructor(combo, parent, onSelectChange, append = true) {
    this.combo = combo
    this.selected = false
    this.onSelectChange = onSelectChange

    this.el = document.createElement('div')

    this.el.classList.add('card-wrap')

    this.el.innerHTML = `<div class="card ${combo.join(' ')}"></div>`

    if (append) parent.appendChild(this.el)

    this.el.addEventListener('click', () => {
      console.log('card click')

      onSelectChange(this)

      //failSound()
      //successSound()
    })
  }

  toggleSelected(quiet = false) {
    if (!quiet) cardTapSound()
    this.selected = !this.selected
    this.el.querySelector('.card').classList.toggle('selected')
  }

  failSound() {
    // false trinity
    knote.playNote(knote.makeNote('G3'), {
      duration: 1.7,
      delay: 0,
      instrument: 'default',
    })
    knote.playNote(knote.makeNote('G#3'), {
      duration: 1.7,
      delay: 0,
      instrument: 'default',
    })
    knote.playNote(knote.makeNote('E#3'), {
      duration: 1.7,
      delay: 0,
      instrument: 'default',
    })
  }

  successSound() {
    successSound();
  }

 /* replace(combo, on) {
    const card = new Card(combo, )
    this.el.parentNode.replaceChild
  }*/

  destroy() {
    this.el.parentNode.removeChild(this.el)
  }
}

function cardTapSound() {
  const noteName = shuffle(['G4', 'C5', 'C4', 'F4', 'D5'])[0]

  knote.cardNoise()

  knote.playNote(knote.makeNote(noteName), {
    duration: 0.8,
    delay: 0,
    instrument: 'ocarina',
  })
  knote.playNote(knote.makeNote(noteName), {
    duration: 0.7,
    delay: 0,
    instrument: 'default',
  })
}



function successSound() {
  knote.playNote(knote.makeNote('C4'), {
    duration: 0.4,
    delay: 0,
    instrument: 'default',
  })
  knote.playNote(knote.makeNote('G4'), {
    duration: 0.4,
    delay: 0.3,
    instrument: 'default',
  })
  knote.playNote(knote.makeNote('C4'), {
    duration: 0.4,
    delay: 0.6,
    instrument: 'default',
  })

  knote.playNote(knote.makeNote('G5'), {
    duration: 0.8,
    delay: 0.9,
    instrument: 'default',
  })
  knote.playNote(knote.makeNote('F5'), {
    duration: 0.8,
    delay: 1.7,
    instrument: 'default',
  })
  knote.playNote(knote.makeNote('C6'), {
    duration: 1.2,
    delay: 2.1,
    instrument: 'default',
  })

  /*knote.playNote(knote.makeNote('C2'), { duration: 0.8, delay: 0, instrument: 'ocarina' })
  knote.playNote(knote.makeNote('G2'), { duration: 0.8, delay: 0.3, instrument: 'ocarina' })
  knote.playNote(knote.makeNote('C4'), { duration: 1.8, delay: 0.6, instrument: 'ocarina' })
  knote.playNote(knote.makeNote('C4'), { duration: 0.8, delay: 0.9, instrument: 'ocarina' })

  knote.playNote(knote.makeNote('G3'), { duration: 0.8, delay: 1.2, instrument: 'ocarina' })

  knote.playNote(knote.makeNote('C5'), { duration: 0.8, delay: 1.5, instrument: 'ocarina' })

  knote.playNote(knote.makeNote('G4'), { duration: 0.8, delay: 1.8, instrument: 'ocarina' })*/
}
