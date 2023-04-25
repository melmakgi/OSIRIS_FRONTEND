import { reactive } from 'vue'
import { eachTree, treeMap, filter } from '@/utils/tree'
import { findIndex } from '@/utils'
import { useDictStoreWithOut } from '@/store/modules/dict'
import { useI18n } from '@/hooks/web/useI18n'
import type { AxiosPromise } from 'axios'
import { FormSchema } from '@/types/form'
import { TableColumn } from '@/types/table'
import { DescriptionsSchema } from '@/types/descriptions'

export type CrudSchema = Omit<TableColumn, 'children'> & {
  search?: CrudSearchParams
  table?: CrudTableParams
  form?: CrudFormParams
  detail?: CrudDescriptionsParams
  children?: CrudSchema[]
}

type CrudSearchParams = {
  // Отображать в пункте запроса
  show?: boolean
  // Имена словарей, которые будут использоваться для получения глобального словаря
  dictName?: string
  // Интерфейс
  api?: () => Promise<any>
  // Поле поиска
  field?: string
} & Omit<FormSchema, 'field'>

type CrudTableParams = {
  // Следует ли отображать головку таблицы
  show?: boolean
} & Omit<FormSchema, 'field'>

type CrudFormParams = {
  // Имена словарей, которые будут использоваться для получения глобального словаря
  dictName?: string
  // Интерфейс
  api?: () => Promise<any>
  // Следует ли отображать записи в форме
  show?: boolean
} & Omit<FormSchema, 'field'>

type CrudDescriptionsParams = {
  // Следует ли отображать записи в форме
  show?: boolean
} & Omit<DescriptionsSchema, 'field'>

const dictStore = useDictStoreWithOut()

const { t } = useI18n()

interface AllSchemas {
  searchSchema: FormSchema[]
  tableColumns: TableColumn[]
  formSchema: FormSchema[]
  detailSchema: DescriptionsSchema[]
}

// Фильтровать все структуры
export const useCrudSchemas = (
  crudSchema: CrudSchema[]
): {
  allSchemas: AllSchemas
} => {
  // Все данные по структуре
  const allSchemas = reactive<AllSchemas>({
    searchSchema: [],
    tableColumns: [],
    formSchema: [],
    detailSchema: []
  })

  const searchSchema = filterSearchSchema(crudSchema, allSchemas)
  allSchemas.searchSchema = searchSchema || []

  const tableColumns = filterTableSchema(crudSchema)
  allSchemas.tableColumns = tableColumns || []

  const formSchema = filterFormSchema(crudSchema, allSchemas)
  allSchemas.formSchema = formSchema

  const detailSchema = filterDescriptionsSchema(crudSchema)
  allSchemas.detailSchema = detailSchema

  return {
    allSchemas
  }
}

// Фильтрация Search в структуре
const filterSearchSchema = (crudSchema: CrudSchema[], allSchemas: AllSchemas): FormSchema[] => {
  const searchSchema: FormSchema[] = []

  // Получить очередь со списком словарей
  const searchRequestTask: Array<() => Promise<void>> = []

  eachTree(crudSchema, (schemaItem: CrudSchema) => {
    // Определите, нужно ли отображать
    if (schemaItem?.search?.show) {
      const searchSchemaItem = {
        // 默认为 input
        component: schemaItem.search.component || 'Input',
        componentProps: {},
        ...schemaItem.search,
        field: schemaItem?.search?.field || schemaItem.field,
        label: schemaItem.search?.label || schemaItem.label
      }

      if (searchSchemaItem.dictName) {
        // Если есть dictName тогда доказано, что данные получены из словаря
        const dictArr = dictStore.getDictObj[searchSchemaItem.dictName]
        searchSchemaItem.componentProps!.options = filterOptions(dictArr)
      } else if (searchSchemaItem.api) {
        searchRequestTask.push(async () => {
          const res = await (searchSchemaItem.api as () => AxiosPromise)()
          if (res) {
            const index = findIndex(allSchemas.searchSchema, (v: FormSchema) => {
              return v.field === searchSchemaItem.field
            })
            if (index !== -1) {
              allSchemas.searchSchema[index]!.componentProps!.options = filterOptions(
                res,
                searchSchemaItem.componentProps.optionsAlias?.labelField
              )
            }
          }
        })
      }

      // Удалите ненужные поля
      delete searchSchemaItem.show
      delete searchSchemaItem.dictName

      searchSchema.push(searchSchemaItem)
    }
  })

  for (const task of searchRequestTask) {
    task()
  }

  return searchSchema
}

// Фильтрация структур таблицы
const filterTableSchema = (crudSchema: CrudSchema[]): TableColumn[] => {
  const tableColumns = treeMap<CrudSchema>(crudSchema, {
    conversion: (schema: CrudSchema) => {
      if (schema?.table?.show !== false) {
        return {
          ...schema.table,
          ...schema
        }
      }
    }
  })

  // В первом фильтре будет undefined Поэтому необходим дополнительный фильтр
  return filter<TableColumn>(tableColumns as TableColumn[], (data) => {
    if (data.children === void 0) {
      delete data.children
    }
    return !!data.field
  })
}

// Структура фильтровальной формы
const filterFormSchema = (crudSchema: CrudSchema[], allSchemas: AllSchemas): FormSchema[] => {
  const formSchema: FormSchema[] = []

  // Получение очереди списка словарей
  const formRequestTask: Array<() => Promise<void>> = []

  eachTree(crudSchema, (schemaItem: CrudSchema) => {
    // Определите, следует ли отображать
    if (schemaItem?.form?.show !== false) {
      const formSchemaItem = {
        // По умолчанию input
        component: schemaItem?.form?.component || 'Input',
        componentProps: {},
        ...schemaItem.form,
        field: schemaItem.field,
        label: schemaItem.search?.label || schemaItem.label
      }

      if (formSchemaItem.dictName) {
        // Если есть dictName тогда доказано, что данные получены из словаря
        const dictArr = dictStore.getDictObj[formSchemaItem.dictName]
        formSchemaItem.componentProps!.options = filterOptions(dictArr)
      } else if (formSchemaItem.api) {
        formRequestTask.push(async () => {
          const res = await (formSchemaItem.api as () => AxiosPromise)()
          if (res) {
            const index = findIndex(allSchemas.formSchema, (v: FormSchema) => {
              return v.field === formSchemaItem.field
            })
            if (index !== -1) {
              allSchemas.formSchema[index]!.componentProps!.options = filterOptions(
                res,
                formSchemaItem.componentProps.optionsAlias?.labelField
              )
            }
          }
        })
      }

      // Удалите лишние поля
      delete formSchemaItem.show
      delete formSchemaItem.dictName

      formSchema.push(formSchemaItem)
    }
  })

  for (const task of formRequestTask) {
    task()
  }
  return formSchema
}

// Фильтрация descriptions в структуре
const filterDescriptionsSchema = (crudSchema: CrudSchema[]): DescriptionsSchema[] => {
  const descriptionsSchema: FormSchema[] = []

  eachTree(crudSchema, (schemaItem: CrudSchema) => {
    // Определите, следует ли показывать
    if (schemaItem?.detail?.show !== false) {
      const descriptionsSchemaItem = {
        ...schemaItem.detail,
        field: schemaItem.field,
        label: schemaItem.detail?.label || schemaItem.label
      }

      // Удалите лишние поля
      delete descriptionsSchemaItem.show

      descriptionsSchema.push(descriptionsSchemaItem)
    }
  })

  return descriptionsSchema
}

// Для options Добавить интернетизацию
const filterOptions = (options: Recordable, labelField?: string) => {
  return options?.map((v: Recordable) => {
    if (labelField) {
      v['labelField'] = t(v.labelField)
    } else {
      v['label'] = t(v.label)
    }
    return v
  })
}
