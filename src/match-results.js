export default class MatchResults {
  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('match-results-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML =
      '<div class="match-results"></div>'

    this.elMatchResults = this.el.querySelector('.match-results')

    this.el.addEventListener('click', () => {
      this.scene.wheel.show()

      setTimeout(() => {
        this.el.classList.remove('win', 'loss')
        this.scene.matchInfo.hide()
      }, 500);
    })
  }

  showWinResults() {
    this.el.classList.add('win')
    this.elMatchResults.innerHTML = '<div class="heading"><div>Match</div> <div>Won!</div></div>'
  }

  showLossResults() {
    this.el.classList.add('loss')
    this.elMatchResults.innerHTML = '<div class="heading"><div>Match</div> <div>Lost!</div></div>'
  }
}
