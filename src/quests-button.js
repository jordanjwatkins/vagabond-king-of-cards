export default class QuestsButton {
  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('quests-button-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML =
      '<div class="quests-button">Quests</div>'

    this.el.addEventListener('click', () => {
      if (this.scene.questList.el.classList.contains('hidden')) {
        this.scene.questList.show()
      } else {
        this.scene.questList.hide()

      }
    })
  }

  show() {
    this.el.classList.remove('hidden')
  }

  hide() {
    this.el.classList.add('hidden')
  }
}
