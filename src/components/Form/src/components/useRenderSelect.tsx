import { ElOption, ElOptionGroup } from 'element-plus'
import { getSlot } from '@/utils/tsxHelper'
import { Slots } from 'vue'
import { FormSchema } from '@/types/form'
import { ComponentOptions } from '@/types/components'

export const useRenderSelect = (slots: Slots) => {
  // Рендеринг select options
  const renderSelectOptions = (item: FormSchema) => {
    // Псевдоним, если доступен
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    return item?.componentProps?.options?.map((option) => {
      if (option?.options?.length) {
        return (
          <ElOptionGroup label={option[labelAlias || 'label']}>
            {() => {
              return option?.options?.map((v) => {
                return renderSelectOptionItem(item, v)
              })
            }}
          </ElOptionGroup>
        )
      } else {
        return renderSelectOptionItem(item, option)
      }
    })
  }

  // Рендеринг select option item
  const renderSelectOptionItem = (item: FormSchema, option: ComponentOptions) => {
    // Псевдоним, если доступен
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    const valueAlias = item?.componentProps?.optionsAlias?.valueField

    const { label, value, ...other } = option

    return (
      <ElOption
        {...other}
        label={labelAlias ? option[labelAlias] : label}
        value={valueAlias ? option[valueAlias] : value}
      >
        {{
          default: () =>
            // option Правила наименования слотов，{field}-option
            item?.componentProps?.optionsSlot
              ? getSlot(slots, `${item.field}-option`, { item: option })
              : undefined
        }}
      </ElOption>
    )
  }

  return {
    renderSelectOptions
  }
}
