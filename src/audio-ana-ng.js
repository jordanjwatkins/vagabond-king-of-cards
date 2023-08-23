import { knote } from './libs/JamKnote'

export default config => new Promise((resolve) => {
  config.knote = knote

  document.body.addEventListener('click', () => {
    if (!knote.initted) knote.init(new window.AudioContext())

    if (!knote.initted) return

    const now = knote.audioContext.currentTime

    // if (!config.aLoop) config.aLoop = aLoop(now)

    const medievalLoop = (startTime) => {
      const now = knote.audioContext.currentTime

      // 1 whole
      // 0.5 half
      // 0.25 quarter
      // 0.12 eighth

      const speedFactor = 1

      const beatDelay = beat => (startTime - now) / 1000 + 0.25 / speedFactor * beat

      const octaveOffset = -1
      let beatCount = 0

      const playNote = (noteNameWOctave, durationMultiplier = 1, incrementBeat = true) => {
        const octave = Number(noteNameWOctave.slice(-1)) + octaveOffset
        const noteName = noteNameWOctave.slice(0, -1)

        knote.playNote(knote.makeNote(`${noteName}${octave}`), { duration: 0.8 * durationMultiplier, delay: beatDelay(beatCount) })

        if (incrementBeat) beatCount += 1
      }



      const chords = {
        E: ['E4', 'G#4', 'B4'],
        Em: ['E4', 'G4', 'B4'],
        C: ['C4', 'E4', 'G4'],
        D: ['D4', 'F#4', 'A4'],
        G: ['G4', 'B4', 'D4'],
        Am: ['A4', 'C4', 'E4'],
        Bb: ['Bb4', 'D4', 'F4'],

      }

      const playChord = (noteNames, durationMultiplier = 1) => {
        if (typeof noteNames === 'string') noteNames = chords[noteNames]

        noteNames.forEach((noteName) => {
          playNote(noteName, durationMultiplier, false)
        })

        beatCount += 1
      }

      const intro = () => {
        playChord(chords['Em'], 2)
        beatCount += 1
        playChord(chords['Em'], 1)
        playChord(chords['Em'], 1)
        beatCount += 1
        playChord(chords['Em'], 1)
        beatCount += 1
        playChord(chords['Em'], 1)
        playChord(chords['C'], 1)
        beatCount += 1
        playChord(chords['C'], 1)
        beatCount += 1
        playChord(chords['D'], 1)
        beatCount += 1
        playChord(chords['D'], 1)
        beatCount += 1

      }

      const verseA = () => {
        playChord(chords['Em'], 4)
        beatCount += 7
        playChord(chords['C'], 2)
        beatCount += 3
        playChord(chords['D'], 2)
        beatCount += 3
      }

      const verseB = () => {
        playChord('E', 5)
        beatCount += 7

        playChord('Am', 2)
        beatCount += 1
        playChord('G', 2)
        beatCount += 1
        playChord('C', 2)
        beatCount += 1
        playChord('G', 2)
        beatCount += 1

        playChord('D', 5)
        beatCount += 7

        playChord('C', 2)
        beatCount += 3

        playChord('D', 2)
        beatCount += 3
      }

      const chorus = () => {
        playChord('G', 2)
        beatCount += 3
        playChord('C', 2)
        beatCount += 3

        playChord('D', 2)
        beatCount += 3

        playChord('C', 2)
        beatCount += 3

        playChord('G', 2)
        beatCount += 3

        playChord('Bb', 2)
        beatCount += 3

        playChord('C', 2)
        beatCount += 3

        playChord('D', 2)
        beatCount += 3
      }

      intro()
      intro()

      verseA()
      verseA()
      verseB()

      verseA()
      verseA()
      verseB()

      chorus()
      chorus()

      verseA()
      verseA()
      verseB()

      verseA()
      verseA()
      verseB()

      chorus()
      chorus()

      /*playChord('E', 4)
      beatCount += 3

      playChord('C', 2)
      beatCount += 1

      playChord('D', 2)
      beatCount += 1*/



      const endDelay = beatDelay(beatCount);

      setTimeout(() => {
        medievalLoop(knote.audioContext.currentTime + 1000 * 0.5)
      }, beatDelay(beatCount - 1) * 1000)
    }

    config.medievalLoop ||= medievalLoop(now)

    resolve()

    setTimeout(() => {
      document.body.classList.add('audio-ready')
    }, 300)
  })
})
