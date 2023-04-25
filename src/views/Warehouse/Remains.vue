<script setup lang="ts">
import {Form} from '@/components/Form'
import {ContentWrap} from '@/components/ContentWrap'
import {useI18n} from '@/hooks/web/useI18n'
import {Table} from '@/components/Table'
import {getTableListApi} from '@/api/table'
import {TableData} from '@/api/table/types'
import {reactive, computed, h} from 'vue'
import {ElTag} from 'element-plus'
import {useTable} from '@/hooks/web/useTable'
import {TableColumn} from '@/types/table'
import {FormSchema} from "@/types/form"
import {useAppStore} from "@/store/modules/app"

const {t} = useI18n()

const appStore = useAppStore();
const isMobile = computed(() => appStore.getMobile)

const selectDeposit = reactive<FormSchema[]>([
  {
    field: 'fieldSelect',
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
    field: 'fieldDivider',
    component: 'Divider',
    label: t('formWarehouseRemains.divider')
  },
])

const columns = reactive<TableColumn[]>([

  {
    field: 'diameter',
    label: t('common.diameter'),
  },
  {
    field: 'seam',
    label: t('common.seam'),
  },
  {
    field: 'supply',
    label: t('formWarehouseRemains.supply'),
  },
  {
    field: 'shipment',
    label: t('formWarehouseRemains.shipment'),
  }
])

const {register, tableObject, methods} = useTable<TableData>({
  getListApi: getTableListApi,
  response: {
    list: 'list',
    total: 'total'
  },
  props: {
    columns
  }
})

const {getList} = methods

getList()

</script>

<template>
  <ContentWrap :title="t('formRemains.remains')" :message="t('formRemains.formDes')">
    <Form :schema="selectDeposit" label-width="auto" :label-position="isMobile ? 'top' : 'right'"/>

    <Table
        v-model:pageSize="tableObject.pageSize"
        v-model:currentPage="tableObject.currentPage"
        :selection="false"
        :data="tableObject.tableList"
        :loading="tableObject.loading"
        :pagination="{
        total: tableObject.total
      }"
        @register="register"
    >
    </Table>
  </ContentWrap>
</template>
