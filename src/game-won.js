export const titleInnerHtml = `
<div class="title-text">
  <span class="v">You</span> <span class="king">Are</span> <span class="cards">King</span>
</div>
<div class="not-true-end">But it doesn't really count unless it's a twelve card match...</div>
<div class="credits">Created by Jordan J Watkins for js13kGames jam 2023</div>
`
export class GameWon {
  constructor(parent, scene) {
    this.scene = scene

    this.el = document.createElement('div')

    this.el.classList.add('title-game-won')

    this.el.innerHTML = `<div class="title-game-won">${titleInnerHtml}</div>`

    parent.appendChild(this.el)

    this.hide()

    this.el.addEventListener('click', () => {
      this.hide()
    })
  }

  show(cardCount) {
    const elNotTrueEnd = this.el.querySelector('.not-true-end')
    if (cardCount === 12) {
      elNotTrueEnd.classList.add('hidden')
    } else {
      elNotTrueEnd.classList.remove('hidden')
    }

    this.el.classList.remove('hidden')
  }

  hide() {
    this.el.classList.add('hidden')
  }
}
