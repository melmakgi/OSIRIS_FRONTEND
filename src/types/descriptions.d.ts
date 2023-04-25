export interface DescriptionsSchema {
  span?: number // Сколько
  field: string // Имя поля
  label?: string // label Имя
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  labelAlign?: 'left' | 'center' | 'right'
  className?: string
  labelClassName?: string
}
