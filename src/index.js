import audio from './audio'
import { getAllCombos } from './get-all-combos'
// import audio from './audio-ana-ng';
import ImageFx from './libs/ImageFx'
import './styles/app.css'

//audio({})

// Live Reload
new EventSource('/esbuild').addEventListener('change', () => location.reload())

const allCombos = getAllCombos()

console.log('vagabond king!!', allCombos)

// border color and pattern (instead of fill and image color)

// unlock german suited deck?
const div = document.createElement('div')

document.body.appendChild(div)

const elCanvas = document.createElement('canvas')

elCanvas.width = document.body.clientWidth
elCanvas.height = document.body.clientHeight

Object.assign(elCanvas.style, {
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: 10,
  pointerEvents: 'none',
})

document.body.appendChild(elCanvas)

const fx = new ImageFx(elCanvas, elCanvas.getContext('2d'))

fx.vignette()
fx.noise(0, 0)
fx.noise(10, 10)

const allCards = allCombos.map(combo => `<div class="card ${combo.join(' ')}"></div>`)

const shuffle = (arr) => arr.sort(() => (Math.random() > 0.5 ? -1 : 1));

shuffle(allCards)

div.innerHTML = allCards.slice(-9).join('')

/*div.innerHTML = `
<div class="card game-color-2"></div>
<div class="card swords dotted game-color-1"></div>
<div class="card swords two dotted game-color-3"></div>
<div class="card swords one dashed game-color-2"></div>
<div class="card coins dashed game-color-3 three"></div>
<div class="card coins dashed game-color-3 two"></div>
<div class="card coins dashed game-color-3 one"></div>
`*/
