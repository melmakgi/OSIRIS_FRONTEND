<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { TableData } from '@/api/table/types'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  }
})

const { t } = useI18n()

const schema = reactive<FormSchema[]>([
  {
    field: 'dateProduction',
    component: 'DatePicker',
    label: t('common.shortcuts'),
    componentProps: {
      type: 'date',
      disabledDate: (time: Date) => {
        return time.getTime() > Date.now()
      },
      shortcuts: [
        {
          text: t('common.today'),
          value: new Date()
        },
        {
          text: t('common.yesterday'),
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        },
        {
          text: t('common.aWeekAgo'),
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          }
        }
      ]
    }
  },
  {
    field: 'fieldSelectDeposit',
    label: t('common.selectDeposit'),
    component: 'Select',
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: 'Месторождение 1',
          value: '1'
        },
        {
          label: 'Месторождение 2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'fieldSelectGuild',
    label: t('common.selectGuild'),
    component: 'Select',
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: 'Цех 1',
          value: '1'
        },
        {
          label: 'Цех 2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'fieldSelectDiameter',
    label: t('common.selectDiameter'),
    component: 'Select',
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: '89',
          value: '1'
        },
        {
          label: '114',
          value: '2'
        },
        {
          label: '146',
          value: '3'
        }
      ]
    }
  },
  {
    field: 'fieldSelectThickness',
    label: t('common.selectThickness'),
    component: 'Select',
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: '4',
          value: '1'
        },
        {
          label: '5',
          value: '2'
        },
        {
          label: '6',
          value: '3'
        }
      ]
    }
  },
  {
    field: 'fieldSelectPipeType',
    label: t('common.selectPipeType'),
    component: 'Select',
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: 'гк',
          value: '1'
        },
        {
          label: 'ппш',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'inputPipeLength',
    label: t('common.inputPipeLength'),
    component: 'InputNumber',
    value: 0,
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'fieldSelectTeam',
    label: t('formProduction.team'),
    component: 'Select',
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: 'Бригада 1',
          value: '1'
        },
        {
          label: 'Бригада 2',
          value: '2'
        }
      ]
    }
  },
])

const rules = reactive({
  shortcuts: [required()],
  selectDeposit: [required()],
  selectGuild: [required()],
  selectDiameter: [required()],
  selectThickness: [required()],
  selectPipeType: [required()],
  inputPipeLength: [required()],
  team: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues, setSchema } = methods
    setValues(currentRow)
    setSchema([
      {
        field: 'content',
        path: 'componentProps.defaultHtml',
        value: currentRow.content
      }
    ])
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  elFormRef,
  getFormData: methods.getFormData
})
</script>

<template>
  <Form :rules="rules" @register="register" />
</template>
