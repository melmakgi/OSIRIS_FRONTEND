<script setup lang="ts">
import { ElDrawer, ElDivider, ElButton, ElMessage } from 'element-plus'
import { ref, unref, computed, watch } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { colorIsDark, lighten, hexToRGB } from '@/utils/color'
import { useCssVar } from '@vueuse/core'
import { useAppStore } from '@/store/modules/app'
import { trim, setCssVar } from '@/utils'
import ColorRadioPicker from './components/ColorRadioPicker.vue'
import InterfaceDisplay from './components/InterfaceDisplay.vue'
import LayoutRadioPicker from './components/LayoutRadioPicker.vue'
import { useCache } from '@/hooks/web/useCache'
import { useClipboard } from '@vueuse/core'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('setting')

const appStore = useAppStore()

const { t } = useI18n()

const layout = computed(() => appStore.getLayout)

const drawer = ref(false)

// Тема, связанная с цветом
const systemTheme = ref(appStore.getTheme.elColorPrimary)

const setSystemTheme = (color: string) => {
  setCssVar('--el-color-primary', color)
  appStore.setTheme({ elColorPrimary: color })
  const leftMenuBgColor = useCssVar('--left-menu-bg-color', document.documentElement)
  setMenuTheme(trim(unref(leftMenuBgColor)))
}

// Тема, связанная с головой
const headerTheme = ref(appStore.getTheme.topHeaderBgColor || '')

const setHeaderTheme = (color: string) => {
  const isDarkColor = colorIsDark(color)
  const textColor = isDarkColor ? '#fff' : 'inherit'
  const textHoverColor = isDarkColor ? lighten(color!, 6) : '#f6f6f6'
  const topToolBorderColor = isDarkColor ? color : '#eee'
  setCssVar('--top-header-bg-color', color)
  setCssVar('--top-header-text-color', textColor)
  setCssVar('--top-header-hover-color', textHoverColor)
  setCssVar('--top-tool-border-color', topToolBorderColor)
  appStore.setTheme({
    topHeaderBgColor: color,
    topHeaderTextColor: textColor,
    topHeaderHoverColor: textHoverColor,
    topToolBorderColor
  })
  if (unref(layout) === 'top') {
    setMenuTheme(color)
  }
}

// Тема меню, связанная с
const menuTheme = ref(appStore.getTheme.leftMenuBgColor || '')

const setMenuTheme = (color: string) => {
  const primaryColor = useCssVar('--el-color-primary', document.documentElement)
  const isDarkColor = colorIsDark(color)
  const theme: Recordable = {
    // Цвет рамки левого меню
    leftMenuBorderColor: isDarkColor ? 'inherit' : '#eee',
    // Цвет фона в левом меню
    leftMenuBgColor: color,
    // Цвет фона левого меню светлый
    leftMenuBgLightColor: isDarkColor ? lighten(color!, 6) : color,
    // Цвет фона чека левого меню
    leftMenuBgActiveColor: isDarkColor
      ? 'var(--el-color-primary)'
      : hexToRGB(unref(primaryColor), 0.1),
    // В левом меню убирается выбранный цвет фона
    leftMenuCollapseBgActiveColor: isDarkColor
      ? 'var(--el-color-primary)'
      : hexToRGB(unref(primaryColor), 0.1),
    // Цвет шрифта в левом меню
    leftMenuTextColor: isDarkColor ? '#bfcbd9' : '#333',
    // Цвет шрифта выбранного левого меню
    leftMenuTextActiveColor: isDarkColor ? '#fff' : 'var(--el-color-primary)',
    // logo Цвет шрифта
    logoTitleTextColor: isDarkColor ? '#fff' : 'inherit',
    // logo Цвет границы
    logoBorderColor: isDarkColor ? color : '#eee'
  }
  appStore.setTheme(theme)
  appStore.setCssVarTheme()
}
if (layout.value === 'top' && !appStore.getIsDark) {
  headerTheme.value = '#fff'
  setHeaderTheme('#fff')
}

// Прослушивание layout вариации，Сброс некоторых цветов темы
watch(
  () => layout.value,
  (n) => {
    if (n === 'top' && !appStore.getIsDark) {
      headerTheme.value = '#fff'
      setHeaderTheme('#fff')
    } else {
      setMenuTheme(unref(menuTheme))
    }
  }
)

// Копировать
const copyConfig = async () => {
  const { copy, copied, isSupported } = useClipboard({
    source: `
      // Хлебные крошки
      breadcrumb: ${appStore.getBreadcrumb},
      // Значок хлебных крошек
      breadcrumbIcon: ${appStore.getBreadcrumbIcon},
      // Складные иконы
      hamburger: ${appStore.getHamburger},
      // Полноэкранные иконки
      screenfull: ${appStore.getScreenfull},
      // Значок размера
      size: ${appStore.getSize},
      // Многоязычные иконки
      locale: ${appStore.getLocale},
      // Вкладки
      tagsView: ${appStore.getTagsView},
      // Значки вкладок
      getTagsViewIcon: ${appStore.getTagsViewIcon},
      // logo
      logo: ${appStore.getLogo},
      // Меню-аккордеон
      uniqueOpened: ${appStore.getUniqueOpened},
      // Исправлено header
      fixedHeader: ${appStore.getFixedHeader},
      // Нижний колонтитул
      footer: ${appStore.getFooter},
      // Серый режим
      greyMode: ${appStore.getGreyMode},
      // layout Макет
      layout: '${appStore.getLayout}',
      // Темный режим
      isDark: ${appStore.getIsDark},
      // Размер компонента
      currentSize: '${appStore.getCurrentSize}',
      // Связанные с темой
      theme: {
        // Тематические цвета
        elColorPrimary: '${appStore.getTheme.elColorPrimary}',
        // Цвет границы левого меню
        leftMenuBorderColor: '${appStore.getTheme.leftMenuBorderColor}',
        // Цвет фона левого меню
        leftMenuBgColor: '${appStore.getTheme.leftMenuBgColor}',
        // Светлый цвет фона левого меню
        leftMenuBgLightColor: '${appStore.getTheme.leftMenuBgLightColor}',
        // 左侧菜单选中背景颜色
        leftMenuBgActiveColor: '${appStore.getTheme.leftMenuBgActiveColor}',
        // Левое меню убирает выбранный цвет фона
        leftMenuCollapseBgActiveColor: '${appStore.getTheme.leftMenuCollapseBgActiveColor}',
        // Цвет шрифта левого меню
        leftMenuTextColor: '${appStore.getTheme.leftMenuTextColor}',
        // Выбранный цвет шрифта левого меню
        leftMenuTextActiveColor: '${appStore.getTheme.leftMenuTextActiveColor}',
        // logo Цвет шрифта
        logoTitleTextColor: '${appStore.getTheme.logoTitleTextColor}',
        // logo Цвет границы
        logoBorderColor: '${appStore.getTheme.logoBorderColor}',
        // Цвет фона заголовка
        topHeaderBgColor: '${appStore.getTheme.topHeaderBgColor}',
        // Цвет шрифта заголовка
        topHeaderTextColor: '${appStore.getTheme.topHeaderTextColor}',
        // Цвет наведения головы
        topHeaderHoverColor: '${appStore.getTheme.topHeaderHoverColor}',
        // Цвет границы головы
        topToolBorderColor: '${appStore.getTheme.topToolBorderColor}'
      }
    `
  })
  if (!isSupported) {
    ElMessage.error(t('setting.copyFailed'))
  } else {
    await copy()
    if (unref(copied)) {
      ElMessage.success(t('setting.copySuccess'))
    }
  }
}

// Очистка кэша
const clear = () => {
  const { wsCache } = useCache()
  wsCache.delete('layout')
  wsCache.delete('theme')
  wsCache.delete('isDark')
  window.location.reload()
}
</script>

<template>
  <div
    :class="prefixCls"
    class="fixed top-[45%] right-0 w-40px h-40px text-center leading-40px bg-[var(--el-color-primary)] cursor-pointer"
    @click="drawer = true"
  >
    <Icon icon="ant-design:setting-outlined" color="#fff" />
  </div>

  <ElDrawer v-model="drawer" direction="rtl" size="350px" :z-index="4000">
    <template #header>
      <span class="text-16px font-700">{{ t('setting.projectSetting') }}</span>
    </template>

    <div class="text-center">
      <!-- Темы -->
      <ElDivider>{{ t('setting.theme') }}</ElDivider>
      <ThemeSwitch />

      <!-- Макет -->
      <ElDivider>{{ t('setting.layout') }}</ElDivider>
      <LayoutRadioPicker />

      <!-- Системные темы -->
      <ElDivider>{{ t('setting.systemTheme') }}</ElDivider>
      <ColorRadioPicker
        v-model="systemTheme"
        :schema="[
          '#409eff',
          '#009688',
          '#536dfe',
          '#ff5c93',
          '#ee4f12',
          '#0096c7',
          '#9c27b0',
          '#ff9800'
        ]"
        @change="setSystemTheme"
      />

      <!-- Главные темы -->
      <ElDivider>{{ t('setting.headerTheme') }}</ElDivider>
      <ColorRadioPicker
        v-model="headerTheme"
        :schema="[
          '#fff',
          '#151515',
          '#5172dc',
          '#e74c3c',
          '#24292e',
          '#394664',
          '#009688',
          '#383f45'
        ]"
        @change="setHeaderTheme"
      />

      <!-- Темы меню -->
      <template v-if="layout !== 'top'">
        <ElDivider>{{ t('setting.menuTheme') }}</ElDivider>
        <ColorRadioPicker
          v-model="menuTheme"
          :schema="[
            '#fff',
            '#001529',
            '#212121',
            '#273352',
            '#191b24',
            '#383f45',
            '#001628',
            '#344058'
          ]"
          @change="setMenuTheme"
        />
      </template>
    </div>

    <!-- Дисплей интерфейса -->
    <ElDivider>{{ t('setting.interfaceDisplay') }}</ElDivider>
    <InterfaceDisplay />

    <ElDivider />
    <div>
      <ElButton type="primary" class="w-full" @click="copyConfig">{{ t('setting.copy') }}</ElButton>
    </div>
    <div class="mt-5px">
      <ElButton type="danger" class="w-full" @click="clear">
        {{ t('setting.clearAndReset') }}
      </ElButton>
    </div>
  </ElDrawer>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-setting';

.@{prefix-cls} {
  border-radius: 6px 0 0 6px;
}
</style>
