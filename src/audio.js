import { NEAR_ZERO, knote } from './libs/JamKnote'

export const api = {}

export default config => new Promise((resolve) => {
  config.knote = knote

  document.body.addEventListener('click', () => {
    console.log('audio click', config)

    if (!knote.initted) knote.init(new window.AudioContext())

    if (!knote.initted) return

    const now = knote.audioContext.currentTime

    console.log('audio click2',)

    const songGainNode = knote.audioContext.createGain()

    api.songGainNode = songGainNode

    api.fadeOut = () => {
      api.songGainNode.gain.setValueCurveAtTime([1, 0.9, NEAR_ZERO], knote.audioContext.currentTime, 1)
    }

    api.fadeIn = () => {
      api.songGainNode.gain.setValueCurveAtTime([NEAR_ZERO, 1], knote.audioContext.currentTime, 0.5)
    }

    songGainNode.connect(knote.mainGain)

    api.cardNoise = () => knote.cardNoise()


    //knote.fireNoise()

    //knote.cardNoise()

    const aLoop = (startTime) => {
      const now = knote.audioContext.currentTime

      knote.playNote(knote.makeNote('Ab1'), { duration: 2, delay: startTime - now + 0.1 })
      knote.playNote(knote.makeNote('Fb1'), { duration: 2, delay: startTime - now + 2 + 0.1 })
      knote.playNote(knote.makeNote('B1'), { duration: 2, delay: startTime - now + 4 + 0.1 })
      knote.playNote(knote.makeNote('Ab1'), { duration: 2, delay: startTime - now + 6 + 0.1 })

      setTimeout(() => {
        aLoop(startTime + 8)
      }, 1000)

      return true
    }

    // if (!config.aLoop) config.aLoop = aLoop(now)

    const medievalLoop = (startTime) => {
      const now = knote.audioContext.currentTime

      // 1 whole
      // 0.5 half
      // 0.25 quarter
      // 0.12 eighth

      const speedFactor = 0.8

      const beatDelay = beat => (startTime - now) / 1000 + 0.25 / speedFactor * beat

      const octaveOffset = -1
      let beatCount = 0

      const playNote = (noteNameWOctave, durationMultiplier = 1, incrementBeat = true) => {
        const octave = Number(noteNameWOctave.slice(-1)) + octaveOffset
        const noteName = noteNameWOctave.slice(0, -1)

        knote.playNote(knote.makeNote(`${noteName}${octave}`), { duration: 0.8 * durationMultiplier, delay: beatDelay(beatCount) }, songGainNode)

        if (incrementBeat) beatCount += 1
      }

      playNote('C4')

      beatCount += 1

      playNote('C4')
      playNote('G4')
      playNote('G4')

      beatCount += 1

      playNote('G4')
      playNote('C5')
      playNote('C5', 2)
      playNote('D5', 2)
      playNote('C5')
      playNote('Bb4')
      playNote('G4', 2)
      beatCount += 1
      playNote('Eb4')
      playNote('F4', 2)
      playNote('G4', 2.1)
      beatCount += 1
      playNote('Eb4')
      playNote('F4', 2)
      playNote('C4', 2)
      beatCount += 1
      playNote('C4', 2)
      playNote('Eb4', 2)
      playNote('F4', 2)
      beatCount += 1
      playNote('C4', 2.1)
      beatCount += 1
      playNote('G4', 4)
      beatCount += 4

      console.log('beatcount', beatCount)



      setTimeout(() => {
        medievalLoop(knote.audioContext.currentTime + 1000 * 0.5)
      }, beatDelay(beatCount - 1) * 1000)
    }

    config.medievalLoop ||= medievalLoop(now)

    const medievalLoop2 = (startTime) => {
      const now = knote.audioContext.currentTime

      // 1 whole
      // 0.5 half
      // 0.25 quarter
      // 0.12 eighth

      const speedFactor = 0.8

      const beatDelay = beat => (startTime - now) / 1000 + 0.25 / speedFactor * beat

      const octaveOffset = -1
      let beatCount = 0

      const playNote = (noteNameWOctave, durationMultiplier = 1, incrementBeat = true) => {
        const octave = Number(noteNameWOctave.slice(-1)) + octaveOffset
        const noteName = noteNameWOctave.slice(0, -1)

        knote.playNote(knote.makeNote(`${noteName}${octave}`), { duration: 0.8 * durationMultiplier, delay: beatDelay(beatCount), instrument: 'ocarina' }, songGainNode)

        if (incrementBeat) beatCount += 1
      }

      //playNote('G4', 2)
      //beatCount += 34
      beatCount += 2

      playNote('C4', 3)
      //playNote('G4')
      //playNote('G4')

      beatCount += 3

      //playNote('G4')
      playNote('G4', 3)
      //playNote('C5', 2)
      /*playNote('D5', 2)
      playNote('C5')
      playNote('Bb4')
      playNote('G4', 2)*/
      beatCount += 5
      //playNote('Eb4')
      playNote('F4', 2)
      playNote('G4', 2)
      //playNote('C4', 3)
      playNote('Eb4', 3)

      beatCount += 4
      playNote('Eb4')
      playNote('F4', 2)
      playNote('C4', 2)
      beatCount += 11
      //playNote('C4', 2)
      //beatCount += 3
      //playNote('Eb4', 2)
      //playNote('F4', 6)
      //beatCount += 1
     // playNote('G4', 6)
      //playNote('C4', 6)
      //beatCount += 1
      //playNote('C4', 4)
      //beatCount += 4


      setTimeout(() => {
        medievalLoop2(knote.audioContext.currentTime + 1000 * 0.5)
      }, beatDelay(beatCount - 1) * 1000)

      return true
    }

    config.medievalLoop2 ||= medievalLoop2(now)

    resolve({ songGainNode })

    setTimeout(() => {
      document.body.classList.add('audio-ready')
    }, 300)
  }, { once: true })
})
