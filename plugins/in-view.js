import Vue from 'vue'

const InView = {}

class Watcher {
  constructor() {
    this.toWatch = []
    this.windowHeight = 0

    window.addEventListener('scroll', this.update.bind(this))
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
    this.update()
  }

  update() {
    this.toWatch.forEach(elementBinding => {
      const { element } = elementBinding
      const rect = element.getBoundingClientRect()
      const { height, top } = rect

      const bottom = top + height

      if (((top >= 0) && (top <= this.windowHeight)) || ((bottom >= 0) && (bottom <= this.windowHeight))) {
        element.classList.add('partiallyInView')
        element.classList.add('beenPartiallyInView')
      } else {
        if (!element.classList.contains('partiallyInView')) return
        element.classList.remove('partiallyInView')
      }

      if ((bottom <= this.windowHeight) && (top <= this.windowHeight) && (bottom >= 0) && (top >= 0)) {
        if (element.classList.contains('inView')) return
        element.classList.add('inView')
        element.classList.add('beenFullyInView')
      } else {
        if (!element.classList.contains('inView')) return
        element.classList.remove('inView')
      }
    })
  }

  resize() {
    this.windowHeight = window.innerHeight
    this.update()
  }

  addElement(element) {
    this.toWatch.push({ element })
  }
}

const watcher = new Watcher()

InView.install = Vue => {
  Vue.directive('inView', {
    bind(el, binding) {
      const { value } = binding
      watcher.addElement(el, value)

      Vue.nextTick(() => watcher.update())
    }
  })
}

Vue.use(InView)
