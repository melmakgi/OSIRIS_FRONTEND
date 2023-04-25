import { useI18n } from '@/hooks/web/useI18n'
import type { Slots } from 'vue'
import { getSlot } from '@/utils/tsxHelper'
import { PlaceholderMoel } from './types'
import { FormSchema } from '@/types/form'
import { ColProps } from '@/types/components'

const { t } = useI18n()

/**
 *
 * @param schema Данные соответствующих компонентов
 * @returns Возвращение объекта подсказки
 * @description Для автоматической установки placeholder
 */
export const setTextPlaceholder = (schema: FormSchema): PlaceholderMoel => {
  const textMap = ['Input', 'Autocomplete', 'InputNumber', 'InputPassword']
  const selectMap = ['Select', 'SelectV2','TimePicker', 'DatePicker', 'TimeSelect', 'TimeSelect']
  if (textMap.includes(schema?.component as string)) {
    return {
      placeholder: t('common.inputText')
    }
  }
  if (selectMap.includes(schema?.component as string)) {
    // Некоторые селекторы диапазонов
    const twoTextMap = ['datetimerange', 'daterange', 'monthrange', 'datetimerange', 'daterange']
    if (
      twoTextMap.includes(
        (schema?.componentProps?.type || schema?.componentProps?.isRange) as string
      )
    ) {
      return {
        startPlaceholder: t('common.startTimeText'),
        endPlaceholder: t('common.endTimeText'),
        rangeSeparator: '-'
      }
    } else {
      return {
        placeholder: t('common.selectText')
      }
    }
  }
  return {}
}

/**
 *
 * @param col Встроенный растр
 * @returns Возврат к Свойствам растра
 * @description Объединение входящих атрибутов растра
 */
export const setGridProp = (col: ColProps = {}): ColProps => {
  const colProps: ColProps = {
    // Если есть промежуток, это означает, что пользователь имеет более высокий приоритет,
    // поэтому сетка по умолчанию не нужна
    ...(col.span
      ? {}
      : {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12
        }),
    ...col
  }
  return colProps
}

/**
 *
 * @param item Свойства поступающих компонентов
 * @returns Добавить по умолчанию clearable свойство
 */
export const setComponentProps = (item: FormSchema): Recordable => {
  const notNeedClearable = ['ColorPicker']
  const componentProps: Recordable = notNeedClearable.includes(item.component as string)
    ? { ...item.componentProps }
    : {
        clearable: true,
        ...item.componentProps
      }
  // Дополнительные атрибуты должны быть удалены
  delete componentProps?.slots
  return componentProps
}

/**
 *
 * @param slots Слот
 * @param slotsProps Свойства слота
 * @param field Имя поля
 */
export const setItemComponentSlots = (
  slots: Slots,
  slotsProps: Recordable = {},
  field: string
): Recordable => {
  const slotObj: Recordable = {}
  for (const key in slotsProps) {
    if (slotsProps[key]) {
      // Уникальный префикс необходим из-за возможности дублирования компонентов
      slotObj[key] = (data: Recordable) => {
        return getSlot(slots, `${field}-${key}`, data)
      }
    }
  }
  return slotObj
}

/**
 *
 * @param schema Form Сформировать структурированные массивы
 * @param formModel FormMoel
 * @returns FormMoel
 * @description Создать соответствующий formModel
 */
export const initModel = (schema: FormSchema[], formModel: Recordable) => {
  const model: Recordable = { ...formModel }
  schema.map((v) => {
    // Если он скрыт, удаляем соответствующее значение
    if (v.hidden) {
      delete model[v.field]
    } else if (v.component && v.component !== 'Divider') {
      const hasField = Reflect.has(model, v.field)
      // Если значение уже существовало ранее, переназначение не производится и используется существующее значение
      model[v.field] = hasField ? model[v.field] : v.value !== void 0 ? v.value : ''
    }
  })
  return model
}

/**
 * @param slots Слот
 * @param field Имя поля
 * @returns Назад FormIiem Слот
 */
export const setFormItemSlots = (slots: Slots, field: string): Recordable => {
  const slotObj: Recordable = {}
  if (slots[`${field}-error`]) {
    slotObj['error'] = (data: Recordable) => {
      return getSlot(slots, `${field}-error`, data)
    }
  }
  if (slots[`${field}-label`]) {
    slotObj['label'] = (data: Recordable) => {
      return getSlot(slots, `${field}-label`, data)
    }
  }
  return slotObj
}
