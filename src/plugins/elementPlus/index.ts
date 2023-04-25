import type { App } from 'vue'

// Некоторые компоненты необходимо вводить глобально,
// например ElScrollbar, в противном случае возникает проблема со стилем некоторых выпадающих элементов.
import { ElLoading, ElScrollbar } from 'element-plus'

const plugins = [ElLoading]

const components = [ElScrollbar]

export const setupElementPlus = (app: App<Element>) => {
  plugins.forEach((plugin) => {
    app.use(plugin)
  })

  components.forEach((component) => {
    app.component(component.name, component)
  })
}
