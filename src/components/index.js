import Portal from './portal'

const components = [
  Portal
]
function install (Vue) {
  components.forEach(function (item) {
    if (item.name) {
      Vue.component(item.name, item)
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { install, Portal }
export default {
  install
}
