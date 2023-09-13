export default class QuestList {
  constructor(parent, scene) {
    this.scene = scene

    const div = document.createElement('div')

    div.classList.add('quest-list-wrap')

    this.el = div

    parent.appendChild(div)

    this.el.innerHTML =
      '<div class="heading"><div>A</div> <div>Prince\'s</div> <div>Path</div></div><div class="quest-list"></div>'

    this.elList = this.el.querySelector('.quest-list')

    this.hide()

    this.updateQuests(initQuests())

    this.currentQuestIndex = 0

    this.quests[this.currentQuestIndex].init(scene)

    this.el.addEventListener('click', () => {})
  }

  updateQuests(quests) {
    this.quests = quests

    this.quests.forEach((quest) => {
      const elQuest = document.createElement('div')

      elQuest.innerHTML = quest.labelText

      this.elList.appendChild(elQuest)
    })
  }

  show() {
    this.el.classList.remove('hidden')
  }

  hide() {
    this.el.classList.add('hidden')
  }

  checkQuest() {
    console.log('check quest', this.quests[this.currentQuestIndex])

    const activeQuest = this.quests[this.currentQuestIndex]

    if (!activeQuest) return

    if (activeQuest.check(this.scene)) {
      console.log('quest complete!!!!!',)

      activeQuest.completed = true

      const elItem = this.elList.querySelectorAll('div')[this.currentQuestIndex]

      elItem.classList.add('complete')

      this.currentQuestIndex += 1

      if (this.quests[this.currentQuestIndex]) {
        this.quests[this.currentQuestIndex].init(this.scene)
      }
    }
  }
}

function initQuests() {
  return [
    {
      labelText: 'Find first trinity',
      init(scene) {
        this.startTrinityCount = scene.stats.trinityCount
      },
      check(scene) {
        return scene.stats.trinityCount > this.startTrinityCount
      },
      completed: false,
    },
    {
      labelText: 'Win a fool duel',
      init(scene) {
        this.startDuelsWon = scene.stats.duelsWon
      },
      check(scene) {
        return scene.stats.duelsWon > this.startDuelsWon
      },
      completed: false,
    },
    {
      labelText: 'Win a 12 card fool duel',
      init(scene) {
        this.startDuelsWon = scene.stats.duelsWon
      },
      check(scene) {
        return scene.stats.foolsDuels12Won > 0
      },
      completed: false,
    },
    {
      labelText: 'Win 3 novice duels',
      init(scene) {
        this.startDuelsWon = scene.stats.duelsWon
      },
      check(scene) {
        return scene.stats.noviceDuelsWon > 0
      },
      completed: false,
    },
    {
      labelText: 'Win 5 adept duels',
      init(scene) {
        this.startDuelsWon = scene.stats.duelsWon
      },
      check(scene) {
        return scene.stats.adeptDuelsWon > 0
      },
      completed: false,
    },
    {
      labelText: 'Win 10 master duels',
      init(scene) {

      },
      check(scene) {
        return scene.stats.masterDuelsWon > 0
      },
      completed: false,
    },
    {
      labelText: 'Defeat the king',
      init(scene) {

      },
      check(scene) {
        return scene.stats.kingsDuelsWon > 0
      },
      completed: false,
    },

    {
      labelText: 'Defeat the king (12 cards)',
      init(scene) {

      },
      check(scene) {
        return scene.stats.kingsDuels12Won > 0
      },
      completed: false,
    },
  ]
}
