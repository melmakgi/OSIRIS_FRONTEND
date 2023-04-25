import { defineStore } from 'pinia'
import { store } from '../index'
import { setCssVar, humpToUnderline } from '@/utils'
import { ElMessage } from 'element-plus'
import { ElementPlusSize } from '@/types/elementPlus'
import { useCache } from '@/hooks/web/useCache'
import { LayoutType } from '@/types/layout'
import { ThemeTypes } from '@/types/theme'

const { wsCache } = useCache()

interface AppState {
  breadcrumb: boolean
  breadcrumbIcon: boolean
  collapse: boolean
  uniqueOpened: boolean
  hamburger: boolean
  screenfull: boolean
  size: boolean
  locale: boolean
  tagsView: boolean
  tagsViewIcon: boolean
  logo: boolean
  fixedHeader: boolean
  greyMode: boolean
  dynamicRouter: boolean
  pageLoading: boolean
  layout: LayoutType
  title: string
  userInfo: string
  isDark: boolean
  currentSize: ElementPlusSize
  sizeMap: ElementPlusSize[]
  mobile: boolean
  footer: boolean
  theme: ThemeTypes
  fixedMenu: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      userInfo: 'userInfo', // Поля для хранения информации о входе - рекомендуется одно поле на проект, чтобы избежать конфликтов с другими проектами
      sizeMap: ['default', 'large', 'small'],
      mobile: false, // Мобильная ли она
      title: import.meta.env.VITE_APP_TITLE, // Название
      pageLoading: false, // Скачки маршрутизации loading

      breadcrumb: true, // Хлебные крошки
      breadcrumbIcon: true, // Иконка хлебной крошки
      collapse: false, // Свернуть
      uniqueOpened: false, // Сохранять ли развернутым только одно подменю
      hamburger: true, // Маленькие иконки
      screenfull: true, // Полноэкранные иконки
      size: true, // Значок размера
      locale: true, // Многоязычные иконки
      tagsView: true, // Вкладки
      tagsViewIcon: true, // Отображать ли значок тегов
      logo: true, // logo
      fixedHeader: true, // Исправлено toolheader
      footer: true, // Показать нижний колонтитул
      greyMode: false, // Вводить ли серый режим для особых дней, например траура
      dynamicRouter: wsCache.get('dynamicRouter') || false, // Динамическая маршрутизация
      fixedMenu: wsCache.get('fixedMenu') || false, // Фиксированное меню или нет

      layout: wsCache.get('layout') || 'classic', // layout Макет
      isDark: wsCache.get('isDark') || false, // Есть ли темный режим
      currentSize: wsCache.get('default') || 'default', // Размер компонента
      theme: wsCache.get('theme') || {
        // Тематические цвета
        elColorPrimary: '#409eff',
        // Цвет границы левого меню
        leftMenuBorderColor: 'inherit',
        // Цвет фона левого меню
        leftMenuBgColor: '#001529',
        // Светлый цвет фона левого меню
        leftMenuBgLightColor: '#0f2438',
        // Цвет фона чека левого меню
        leftMenuBgActiveColor: 'var(--el-color-primary)',
        // В левом меню убирается выбранный цвет фона
        leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
        // Цвет шрифта левого меню
        leftMenuTextColor: '#bfcbd9',
        // Цвет шрифта, выбранный в левом меню
        leftMenuTextActiveColor: '#fff',
        // logo Цвет шрифта
        logoTitleTextColor: '#fff',
        // logo Цвет границы
        logoBorderColor: 'inherit',
        // Цвет фона заголовка
        topHeaderBgColor: '#fff',
        // Цвет шрифта заголовка
        topHeaderTextColor: 'inherit',
        // Цвет при наведении
        topHeaderHoverColor: '#f6f6f6',
        // Цвет границы головки
        topToolBorderColor: '#eee'
      }
    }
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    },
    getBreadcrumbIcon(): boolean {
      return this.breadcrumbIcon
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getUniqueOpened(): boolean {
      return this.uniqueOpened
    },
    getHamburger(): boolean {
      return this.hamburger
    },
    getScreenfull(): boolean {
      return this.screenfull
    },
    getSize(): boolean {
      return this.size
    },
    getLocale(): boolean {
      return this.locale
    },
    getTagsView(): boolean {
      return this.tagsView
    },
    getTagsViewIcon(): boolean {
      return this.tagsViewIcon
    },
    getLogo(): boolean {
      return this.logo
    },
    getFixedHeader(): boolean {
      return this.fixedHeader
    },
    getGreyMode(): boolean {
      return this.greyMode
    },
    getDynamicRouter(): boolean {
      return this.dynamicRouter
    },
    getFixedMenu(): boolean {
      return this.fixedMenu
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getLayout(): LayoutType {
      return this.layout
    },
    getTitle(): string {
      return this.title
    },
    getUserInfo(): string {
      return this.userInfo
    },
    getIsDark(): boolean {
      return this.isDark
    },
    getCurrentSize(): ElementPlusSize {
      return this.currentSize
    },
    getSizeMap(): ElementPlusSize[] {
      return this.sizeMap
    },
    getMobile(): boolean {
      return this.mobile
    },
    getTheme(): ThemeTypes {
      return this.theme
    },
    getFooter(): boolean {
      return this.footer
    }
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setUniqueOpened(uniqueOpened: boolean) {
      this.uniqueOpened = uniqueOpened
    },
    setHamburger(hamburger: boolean) {
      this.hamburger = hamburger
    },
    setScreenfull(screenfull: boolean) {
      this.screenfull = screenfull
    },
    setSize(size: boolean) {
      this.size = size
    },
    setLocale(locale: boolean) {
      this.locale = locale
    },
    setTagsView(tagsView: boolean) {
      this.tagsView = tagsView
    },
    setTagsViewIcon(tagsViewIcon: boolean) {
      this.tagsViewIcon = tagsViewIcon
    },
    setLogo(logo: boolean) {
      this.logo = logo
    },
    setFixedHeader(fixedHeader: boolean) {
      this.fixedHeader = fixedHeader
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode
    },
    setDynamicRouter(dynamicRouter: boolean) {
      wsCache.set('dynamicRouter', dynamicRouter)
      this.dynamicRouter = dynamicRouter
    },
    setFixedMenu(fixedMenu: boolean) {
      wsCache.set('fixedMenu', fixedMenu)
      this.fixedMenu = fixedMenu
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading
    },
    setLayout(layout: LayoutType) {
      if (this.mobile && layout !== 'classic') {
        ElMessage.warning('Переключение на другие макеты не поддерживается в мобильном режиме')
        return
      }
      this.layout = layout
      wsCache.set('layout', this.layout)
    },
    setTitle(title: string) {
      this.title = title
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      wsCache.set('isDark', this.isDark)
    },
    setCurrentSize(currentSize: ElementPlusSize) {
      this.currentSize = currentSize
      wsCache.set('currentSize', this.currentSize)
    },
    setMobile(mobile: boolean) {
      this.mobile = mobile
    },
    setTheme(theme: ThemeTypes) {
      this.theme = Object.assign(this.theme, theme)
      wsCache.set('theme', this.theme)
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
      }
    },
    setFooter(footer: boolean) {
      this.footer = footer
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
