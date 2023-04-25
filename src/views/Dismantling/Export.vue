<script setup lang="ts">
import {Form} from '@/components/Form'
import {reactive, computed, h, ref} from 'vue'
import {useI18n} from '@/hooks/web/useI18n'
import {ContentWrap} from '@/components/ContentWrap'
import {useAppStore} from '@/store/modules/app'
import {FormSchema} from '@/types/form'
import {useRouter} from "vue-router";
import {useTable} from "@/hooks/web/useTable";
import {TableData} from "@/api/table/types";
import {delTableListApi, getTableListApi} from "@/api/table";
import {useEmitt} from "@/hooks/web/useEmitt";
import {CrudSchema, useCrudSchemas} from "@/hooks/web/useCrudSchemas";
import {ElButton} from "element-plus";

import {Search} from '@/components/Search'
import {Table} from '@/components/Table'
import {useIcon} from "@/hooks/web/useIcon";

const {t} = useI18n()

const appStore = useAppStore();
const {push} = useRouter()

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
    label: t('formExport.divider')
  },
])

/**/
const {register, tableObject, methods} = useTable<TableData>({
  getListApi: getTableListApi,
  delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const {getList, setSearchParams} = methods

getList()

useEmitt({
  name: 'getList',
  callback: (type: string) => {
    if (type === 'add') {
      tableObject.currentPage = 1
    }
    getList()
  }
})

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'date',
    label: t('common.date')
  },
  {
    field: 'seam',
    label: t('common.seam'),
    search: {
      show: true
    }
  },
  {
    field: 'diameter',
    label: t('common.diameter'),
    search: {
      show: true
    }
  },
  {
    field: 'wall',
    label: t('common.wall'),
    search: {
      show: true
    }
  },
  {
    field: 'length',
    label: t('common.length')
  },
  {
    field: 'weight',
    label: t('common.weight')
  },
  {
    field: 'action',
    width: '340px',
    label: t('common.action')
  }
])

const {allSchemas} = useCrudSchemas(crudSchemas)

const AddAction = () => {
  push('/example/example-add')
}

const delLoading = ref(false)

const delData = async (row: TableData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const {delList, getSelections} = methods
  const selections = await getSelections()
  delLoading.value = true
  await delList(
      multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as string],
      multiple
  ).finally(() => {
    delLoading.value = false
  })
}

const action = (row: TableData, type: string) => {
  push(`/example/example-${type}?id=${row.id}`)
}

const edit = useIcon({ icon: 'svg-icon:edit-square-outline' });
const detail = useIcon({ icon: 'svg-icon:detail' });
const del = useIcon({ icon: 'svg-icon:table-row-delete' })

</script>

<template>
  <ContentWrap :title="t('formExport.export')" :message="t('formExport.formDes')">
    <Form :schema="selectDeposit" label-width="auto" :label-position="isMobile ? 'top' : 'right'"/>

    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams"/>

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('common.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
        {{ t('common.del') }}
      </ElButton>
    </div>

    <Table
        v-model:pageSize="tableObject.pageSize"
        v-model:currentPage="tableObject.currentPage"
        :columns="allSchemas.tableColumns"
        :data="tableObject.tableList"
        :loading="tableObject.loading"
        :pagination="{
        total: tableObject.total
      }"
        @register="register"
    >
      <template #action="{ row }">
        <ElButton type="primary" @click="action(row, 'edit')" :icon="edit"/>
        <ElButton type="success" @click="action(row, 'detail')" :icon="detail"/>
        <ElButton type="danger" @click="delData(row, false)" :icon="del"/>
      </template>
    </Table>
  </ContentWrap>
</template>

<style lang="less" scoped>
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;

  .text {
    position: absolute;
    left: 50%;
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    line-height: 24px;
    border-radius: 50%;
    transform: translateX(-50%);
  }

  &.current {
    .text {
      color: #fff;
      background: purple;
    }
  }

  .holiday {
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 6px;
    height: 6px;
    background: red;
    border-radius: 50%;
    transform: translateX(-50%);
  }
}
</style>
