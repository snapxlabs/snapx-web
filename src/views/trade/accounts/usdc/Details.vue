<template>
    <el-dialog
        v-model="visible"
        @open="onDialogOpen"
        @close="onDialogClose"
    >
        <el-form
            :inline="true"
            :model="filter.condition"
        >
            <el-form-item>
                <el-button
                    type="primary"
                    :icon="ElIconPlus"
                    @click="onAdd"
                >Add</el-button>
            </el-form-item>
        </el-form>
        <el-table
            v-loading="table.loading"
            :data="table.dataList"
            element-loading-text="Loading"
            :border="true"
            fit
            highlight-current-row
        >
            <el-table-column
                :align="center"
                type="index"
                label="No"
                width="80"
            >
                <template #default="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Subject"
            >
                <template #default="scope">
                    {{ scope.row.subject }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Direction"
                width="90"
            >
                <template #default="scope">
                    {{ scope.row.direction }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Amount"
                width="80"
            >
                <template #default="scope">
                    {{ scope.row.amount }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Balance Before"
                width="80"
            >
                <template #default="scope">
                    {{ scope.row.balanceBefore }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Balance After"
                width="80"
            >
                <template #default="scope">
                    {{ scope.row.balanceAfter }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Remarks"
            >
                <template #default="scope">
                    {{ scope.row.remarks }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Create Time"
            >
                <template #default="scope">
                    <el-icon><Clock /></el-icon>
                    <span>{{ formatDatetime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :current-page="pager.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pager.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            style="padding: 30px 0; text-align: center"
            :total="pager.count"
            @current-change="onPageChange"
            @size-change="onPageSizeChange"
        />
    </el-dialog>
    <Editor
        :id="editorDialog.id"
        :visible="editorDialog.visible"
        @updated="onReset"
    />
</template>

<script setup>
import { ref } from 'vue'
import { $ref, defineProps } from 'vue/macros'
import { pageAccountsDetails } from '@/api/trade/usdc-accounts'
import { utcToLocal } from '@/utils'
import { Plus as ElIconPlus, Clock } from '@element-plus/icons'
import Editor from './Editor.vue'

const [editorDialog, showEditor] = useEditor()

const props = defineProps({
  visible: ref(false),
  id: ref(null),
})

let visible = $ref(props.visible)

let filter = $ref({
  condition: {},
  createTime: []
})
let table = $ref({
  loading: true,
  dataList: []
})
let pager = $ref({
  page: 1,
  pageSize: 10,
  count: 0
})

function onDialogOpen() {
  filter.condition.memberId = props.id
  table.loading = true
  reloadTable()
}

function onDialogClose() {

}

function reloadTable() {
  pageAccountsDetails({
    page: pager.page,
    pageSize: pager.pageSize,
    ...filter.condition
  }).then(response => {
    table.dataList = response.data.data
    table.loading = false
    pager.page = response.data.currPage
    pager.pageSize = response.data.pageSize
    pager.count = response.data.totalCount
  })
}

function onPageChange(page) {
  pager.page = page
  reloadTable()
}

function onPageSizeChange(pageSize) {
  pager.pageSize = pageSize
  reloadTable()
}

function onAdd() {
  showEditor(props.id.value)
}

function onReset() {
  reloadTable()
}

function formatDatetime(datetime) {
  return utcToLocal(datetime)
}

function useEditor() {
  let visible = ref(false)
  let id = ref(null)
  return [
    {visible, id},
    (p) => {
      id.value = p
      visible.value = true
    }
  ]
}
</script>

<style scoped>
  .el-pagination {
    justify-content: center;
  }
</style>
<style scoped>
  .el-pagination {
    justify-content: center;
  }
</style>