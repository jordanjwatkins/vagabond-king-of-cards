import Cards from './cards'
import ClaimButton from './claim-button'
import ClaimResults from './claim-results'
import ImageFx from './libs/ImageFx'
import MatchInfo from './match-info'
import './styles/app.css'
import Timer from './timer'
import title, { TitleCard } from './title'

// Live Reload
new EventSource('/esbuild').addEventListener('change', () => location.reload())

// Effects canvas
const elCanvas = document.createElement('canvas')

elCanvas.width = 500
elCanvas.height = 300

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

const scene = {
  claimStruck: false,
}

const elGameWrap = document.createElement('div')

elGameWrap.classList.add('game-wrap')

document.body.appendChild(elGameWrap)

const elMain = document.createElement('div')

elMain.classList.add('main')

scene.cards = new Cards(elMain, scene)

elGameWrap.appendChild(elMain)

const elAside = document.createElement('div')

elAside.classList.add('aside')

scene.titleCard = new TitleCard(elAside, scene)
scene.matchInfo = new MatchInfo(elAside, scene)
scene.claimButton = new ClaimButton(elAside, scene)
scene.timer = new Timer(scene.claimButton.el, scene)

elGameWrap.appendChild(elAside)

scene.claimResults = new ClaimResults(document.body, scene)

title()

const elWheel = document.createElement('div')

elWheel.classList.add('wheel-wrap')

elWheel.innerHTML = '<div class="wheel-card"><div class="travel-text">Traveling yonder...</div></div>'

document.body.appendChild(elWheel)

scene.showWheel = () => {
  elWheel.classList.add('in')
}

scene.hideWheel = () => {
  elWheel.classList.remove('in')
}

/*setTimeout(() => {
 scene.showWheel()

  setTimeout(() => {
    scene.hideWheel()
  }, 1000)

}, 1000)*/
