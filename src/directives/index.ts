import type { App } from 'vue'
import { setupPermissionDirective } from './permission/hasPermi'

/**
 * Инструкции по экспорту：v-xxx
 * @methods hasPermi Разрешения кнопок，Использование: v-hasPermi
 */
export const setupPermission = (app: App<Element>) => {
  setupPermissionDirective(app)
}
