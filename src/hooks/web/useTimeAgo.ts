import { useTimeAgo as useTimeAgoCore, UseTimeAgoMessages } from '@vueuse/core'
import { computed, unref } from 'vue'
import { useLocaleStoreWithOut } from '@/store/modules/locale'

const TIME_AGO_MESSAGE_MAP: {
  ru: UseTimeAgoMessages
  en: UseTimeAgoMessages
} = {
  ru: {
    justNow: 'Только что',
    invalid: 'Срок действия',
    past: (n) => (n.match(/\d/) ? `${n}назад` : n),
    future: (n) => (n.match(/\d/) ? `${n}в` : n),
    month: (n, past) => (n === 1 ? (past ? 'предыдущий месяц' : 'следующий месяц') : `${n} месяц`),
    year: (n, past) => (n === 1 ? (past ? 'предыдущий год' : 'следующий год') : `${n} год`),
    day: (n, past) => (n === 1 ? (past ? 'вчера' : 'завтра') : `${n} день`),
    week: (n, past) => (n === 1 ? (past ? 'прошлая неделя' : 'следующая неделя') : `${n} неделя`),
    hour: (n) => `${n} час`,
    minute: (n) => `${n} минута`,
    second: (n) => `${n} секунда`
  },
  en: {
    justNow: 'Только что',
    invalid: 'Invalid Date',
    past: (n) => (n.match(/\d/) ? `${n} ago` : n),
    future: (n) => (n.match(/\d/) ? `in ${n}` : n),
    month: (n, past) =>
      n === 1 ? (past ? 'last month' : 'next month') : `${n} month${n > 1 ? 's' : ''}`,
    year: (n, past) =>
      n === 1 ? (past ? 'last year' : 'next year') : `${n} year${n > 1 ? 's' : ''}`,
    day: (n, past) => (n === 1 ? (past ? 'yesterday' : 'tomorrow') : `${n} day${n > 1 ? 's' : ''}`),
    week: (n, past) =>
      n === 1 ? (past ? 'last week' : 'next week') : `${n} week${n > 1 ? 's' : ''}`,
    hour: (n) => `${n} hour${n > 1 ? 's' : ''}`,
    minute: (n) => `${n} minute${n > 1 ? 's' : ''}`,
    second: (n) => `${n} second${n > 1 ? 's' : ''}`
  }
}

export const useTimeAgo = (time: Date | number | string) => {
  const localeStore = useLocaleStoreWithOut()

  const currentLocale = computed(() => localeStore.getCurrentLocale)

  const timeAgo = useTimeAgoCore(time, {
    messages: TIME_AGO_MESSAGE_MAP[unref(currentLocale).lang]
  })

  return timeAgo
}
