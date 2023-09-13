import audio, { api } from './audio'

export const titleInnerHtml = '<div class="title-text"><span class="v">Vagabond</span><br><span class="king">King</span> <span class="of">of</span> <span class="cards">Cards</span></div>'

export default () => {
  const elTitle = document.createElement('div')

  elTitle.classList.add('title')

  elTitle.innerHTML = titleInnerHtml

  document.body.appendChild(elTitle)

  elTitle.addEventListener('click', () => {
    audio({})

    document.addEventListener('visibilitychange', (event) => {
      console.log('event', event)
      if (document.visibilityState === "visible") {
        console.log('play',)

        api.fadeIn()

        //backgroundMusic.play();
      } else {
        console.log('stop',)
        api.fadeOut()
        //backgroundMusic.pause();
      }

    })

    elTitle.style.display = 'none'
  })
}

export class TitleCard {
  constructor(parent, scene) {
    this.scene = scene

    this.el = document.createElement('div')

    this.el.classList.add('title-in-aside-wrap')

    this.el.innerHTML = `<div class="title-in-aside">${titleInnerHtml}</div>`

    parent.appendChild(this.el)
  }
}
