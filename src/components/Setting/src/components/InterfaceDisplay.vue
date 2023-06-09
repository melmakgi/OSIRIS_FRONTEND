<script setup lang="ts">
import { ElSwitch, ElMessage } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useAppStore } from '@/store/modules/app'
import { computed, ref, watch } from 'vue'
import { setCssVar } from '@/utils'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('interface-display')

const appStore = useAppStore()

const { t } = useI18n()

// Хлебные крошки
const breadcrumb = ref(appStore.getBreadcrumb)

const breadcrumbChange = (show: boolean) => {
  appStore.setBreadcrumb(show)
}

// Значок хлебных крошек
const breadcrumbIcon = ref(appStore.getBreadcrumbIcon)

const breadcrumbIconChange = (show: boolean) => {
  appStore.setBreadcrumbIcon(show)
}

// Складные иконки
const hamburger = ref(appStore.getHamburger)

const hamburgerChange = (show: boolean) => {
  appStore.setHamburger(show)
}

// Полноэкранные иконки
const screenfull = ref(appStore.getScreenfull)

const screenfullChange = (show: boolean) => {
  appStore.setScreenfull(show)
}

// Значок размера
const size = ref(appStore.getSize)

const sizeChange = (show: boolean) => {
  appStore.setSize(show)
}

// Иконка языков
const locale = ref(appStore.getLocale)

const localeChange = (show: boolean) => {
  appStore.setLocale(show)
}

// Вкладки
const tagsView = ref(appStore.getTagsView)

const tagsViewChange = (show: boolean) => {
  // При переключении показа панели вкладок，Синхронизированное переключение высоты панели вкладок
  setCssVar('--tags-view-height', show ? '35px' : '0px')
  appStore.setTagsView(show)
}

// Значки вкладок
const tagsViewIcon = ref(appStore.getTagsViewIcon)

const tagsViewIconChange = (show: boolean) => {
  appStore.setTagsViewIcon(show)
}

// logo
const logo = ref(appStore.getLogo)

const logoChange = (show: boolean) => {
  appStore.setLogo(show)
}

// Меню аккордеон
const uniqueOpened = ref(appStore.getUniqueOpened)

const uniqueOpenedChange = (uniqueOpened: boolean) => {
  appStore.setUniqueOpened(uniqueOpened)
}

// Фиксированная головка
const fixedHeader = ref(appStore.getFixedHeader)

const fixedHeaderChange = (show: boolean) => {
  appStore.setFixedHeader(show)
}

// Нижний колонтитул
const footer = ref(appStore.getFooter)

const footerChange = (show: boolean) => {
  appStore.setFooter(show)
}

// Серый режим
const greyMode = ref(appStore.getGreyMode)

const greyModeChange = (show: boolean) => {
  appStore.setGreyMode(show)
}

// Динамическая маршрутизация
const dynamicRouter = ref(appStore.getDynamicRouter)

const dynamicRouterChange = (show: boolean) => {
  ElMessage.info(t('setting.reExperienced'))
  appStore.setDynamicRouter(show)
}

// Фиксированное меню
const fixedMenu = ref(appStore.getFixedMenu)

const fixedMenuChange = (show: boolean) => {
  appStore.setFixedMenu(show)
}

const layout = computed(() => appStore.getLayout)

watch(
  () => layout.value,
  (n) => {
    if (n === 'top') {
      appStore.setCollapse(false)
    }
  }
)
</script>

<template>
  <div :class="prefixCls">
    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.breadcrumb') }}</span>
      <ElSwitch v-model="breadcrumb" @change="breadcrumbChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.breadcrumbIcon') }}</span>
      <ElSwitch v-model="breadcrumbIcon" @change="breadcrumbIconChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.hamburgerIcon') }}</span>
      <ElSwitch v-model="hamburger" @change="hamburgerChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.screenFullIcon') }}</span>
      <ElSwitch v-model="screenfull" @change="screenfullChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.sizeIcon') }}</span>
      <ElSwitch v-model="size" @change="sizeChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.localeIcon') }}</span>
      <ElSwitch v-model="locale" @change="localeChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.tagsView') }}</span>
      <ElSwitch v-model="tagsView" @change="tagsViewChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.tagsViewIcon') }}</span>
      <ElSwitch v-model="tagsViewIcon" @change="tagsViewIconChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.logo') }}</span>
      <ElSwitch v-model="logo" @change="logoChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.uniqueOpened') }}</span>
      <ElSwitch v-model="uniqueOpened" @change="uniqueOpenedChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.fixedHeader') }}</span>
      <ElSwitch v-model="fixedHeader" @change="fixedHeaderChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.footer') }}</span>
      <ElSwitch v-model="footer" @change="footerChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.greyMode') }}</span>
      <ElSwitch v-model="greyMode" @change="greyModeChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.dynamicRouter') }}</span>
      <ElSwitch v-model="dynamicRouter" @change="dynamicRouterChange" />
    </div>

    <div class="flex justify-between items-center">
      <span class="text-14px">{{ t('setting.fixedMenu') }}</span>
      <ElSwitch v-model="fixedMenu" @change="fixedMenuChange" />
    </div>
  </div>
</template>
