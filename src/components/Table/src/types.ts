import { Pagination, TableColumn } from '@/types/table'

export type TableProps = {
  pageSize?: number
  currentPage?: number
  // Множественный выбор или нет
  selection?: boolean
  // Все они скрыты, приоритет ниже schema в showOverflowTooltip,
  showOverflowTooltip?: boolean
  // Головка таблицы
  columns?: TableColumn[]
  // Показывать или не показывать пагинацию
  pagination?: Pagination | undefined
  // Только для type=selection действительна для столбцов типа Boolean，
  // для true выбранные ранее данные будут сохранены после обновления данных（Необходимо указать row-key）
  reserveSelection?: boolean
  // Состояние загрузки
  loading?: boolean
  // Нужно ли накладывать индекс
  reserveIndex?: boolean
  // Метод выравнивания
  align?: 'left' | 'center' | 'right'
  // Выравнивание заголовка таблиц
  headerAlign?: 'left' | 'center' | 'right'
  data?: Recordable
  expand?: boolean
} & Recordable
