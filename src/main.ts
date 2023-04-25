// Импорт windicss
import '@/plugins/windi.css'

// Импорт глобальных иконок svg
import '@/plugins/svgIcon'

// Инициализация многоязычности
import { setupI18n } from '@/plugins/vueI18n'

// Импорт управления состоянием
import { setupStore } from '@/store'

// Глобальные компоненты
import { setupGlobCom } from '@/components'

// Импорт Element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// Импорт глобальных стилей
import '@/styles/index.less'

// Импорт анимации
import '@/plugins/animate.css'

// Маршрутизация
import { setupRouter } from './router'

// Разрешения
import { setupPermission } from './directives'

import { createApp } from 'vue'

import App from './App.vue'

import './permission'

// Создание экземпляра
const setupAll = async () => {
  const app = createApp(App)

  await setupI18n(app)

  setupStore(app)

  setupGlobCom(app)

  setupElementPlus(app)

  setupRouter(app)

  setupPermission(app)

  app.mount('#app')
}

setupAll()
