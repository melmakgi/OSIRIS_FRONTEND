<script setup lang="ts">
import { PropType, reactive } from 'vue'
import type { TableData } from '@/api/table/types'
import { Descriptions } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { ElTag } from 'element-plus'
import { DescriptionsSchema } from '@/types/descriptions'
import {FormSchema} from "@/types/form";

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  }
})

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
  },
  {
    field: 'fieldSelectTeam',
    label: t('formProduction.team'),
    component: 'Select',
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
</script>

<template>
  <Descriptions :schema="schema" :data="currentRow || {}">
    <template #content="{ row }: { row: TableData }">
      <div v-html="row.content"></div>
    </template>
  </Descriptions>
</template>
