import type { CSSProperties } from 'vue'
import { ColProps, ComponentProps, ComponentName } from '@/types/components'
import { FormValueType } from '@/types/form'
import type { AxiosPromise } from 'axios'

export type FormSetPropsType = {
  field: string
  path: string
  value: any
}

export type FormValueType = string | number | string[] | number[] | boolean | undefined | null

export type FormItemProps = {
  labelWidth?: string | number
  required?: boolean
  rules?: Recordable
  error?: string
  showMessage?: boolean
  inlineMessage?: boolean
  style?: CSSProperties
}

export type FormSchema = {
  // Уникальная ценность
  field: string
  // Название
  label?: string
  // Советы
  labelMessage?: string
  // свойства компонентов колонок
  colProps?: ColProps
  // Атрибут компонента формы, slots соответствует слотам в компоненте формы,
  // правило: ${field}-xxx, подробнее см. документацию element-plus
  componentProps?: { slots?: Recordable } & ComponentProps
  // свойства компонента formItem
  formItemProps?: FormItemProps
  // Рендеринг компонентов
  component?: ComponentName
  // Начальное значение
  value?: FormValueType
  // Скрывать или не скрывать
  hidden?: boolean
  // Удаленная загрузка раскрывающихся элементов
  api?: <T = any>() => AxiosPromise<T>
}
