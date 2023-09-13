import Cards from './cards'
import ClaimButton from './claim-button'
import ClaimResults from './claim-results'
import { GameWon } from './game-won'
import ImageFx from './libs/ImageFx'
import MatchInfo from './match-info'
import MatchList from './match-list'
import MatchResults from './match-results'
import QuestList from './quest-list'
import QuestsButton from './quests-button'
import Renown from './renown'
import './styles/app.css'
import Timer from './timer'
import title, { TitleCard } from './title'
import Wheel from './wheel'

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
  stats: {
    trinityCount: 0,
    duelsWon: 0,
  }
}

const elGameWrap = document.createElement('div')

elGameWrap.classList.add('game-wrap')

document.body.appendChild(elGameWrap)

const elMain = document.createElement('div')

scene.elMain = elMain

elMain.classList.add('main')

scene.cards = new Cards(elMain, scene)

elGameWrap.appendChild(elMain)

const elAside = document.createElement('div')

elAside.classList.add('aside')

scene.titleCard = new TitleCard(elAside, scene)
scene.matchInfo = new MatchInfo(elAside, scene)
scene.claimButton = new ClaimButton(elAside, scene)
scene.timer = new Timer(scene.claimButton.el, scene)
scene.questsButton = new QuestsButton(elAside, scene)
scene.renown = new Renown(elAside, scene)

elGameWrap.appendChild(elAside)

scene.claimResults = new ClaimResults(elMain, scene)
scene.matchResults = new MatchResults(elMain, scene)
scene.wheel = new Wheel(elMain, scene)
scene.matchList = new MatchList(elMain, scene)
scene.questList = new QuestList(elMain, scene)

title()

scene.gameWon = new GameWon(document.body, scene);
