<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100%">
                <el-form
                    :inline="true"
                    :model="filter.condition"
                >
                    <el-form-item label="Title">
                        <el-input
                            v-model="filter.condition.title"
                            placeholder="filter by title"
                        />
                    </el-form-item>
                    <el-form-item label="Context">
                        <el-input
                            v-model="filter.condition.context"
                            placeholder="filter by context"
                        />
                    </el-form-item>
                    <el-form-item label="Status">
                        <el-select
                            v-model="filter.condition.status"
                            placeholder="filter by status"
                        >
                            <el-option
                                label="DRAFT"
                                value="DRAFT"
                            />
                            <el-option
                                label="PROCESS"
                                value="PROCESS"
                            />
                            <el-option
                                label="DONE"
                                value="DONE"
                            />
                            <el-option
                                label="FAIL"
                                value="FAIL"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            :icon="ElIconSearch"
                            @click="onSearch"
                        >Serach</el-button>
                        <el-button
                            :icon="ElIconRefreshLeft"
                            @click="onReset"
                        >Reset</el-button>
                        <el-button
                            type="primary"
                            :icon="ElIconPlus"
                            @click="onAdd"
                        >Add</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
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
                        width="60"
                    >
                        <template #default="scope">
                            {{ scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="ID"
                        width="180"
                    >
                        <template #default="scope">
                            {{ scope.row.id }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Title"
                        width="300"
                    >
                        <template #default="scope">
                            {{ scope.row.title }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Context"
                    >
                        <template #default="scope">
                            {{ scope.row.context }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Description"
                        width="250"
                    >
                        <template #default="scope">
                            {{ scope.row.description }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="InSiteMessage"
                        width="125"
                    >
                        <template #default="scope">
                            {{ toYesNoFilter(scope.row.inSiteMessage) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Push"
                        width="100"
                    >
                        <template #default="scope">
                            {{ toYesNoFilter(scope.row.push) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Global"
                        width="100"
                    >
                        <template #default="scope">
                            {{ toYesNoFilter(scope.row.global) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Status"
                        width="100"
                    >
                        <template #default="scope">
                            <el-tag :type="selectStatusTag(scope.row.status)">
                                {{ scope.row.status }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Create Time"
                        width="200"
                    >
                        <template #default="scope">
                            <el-icon><Clock /></el-icon>
                            <span>{{ formatDatetime(scope.row.createTime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Update Time"
                        width="200"
                    >
                        <template #default="scope">
                            <el-icon><Clock /></el-icon>
                            <span>{{ formatDatetime(scope.row.updateTime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Operation"
                        width="250"
                        :align="center"
                    >
                        <template #default="scope">
                            <el-space wrap>
                                <el-link type="primary" @click="onEdit(scope.row.id)">
                                    Edit <el-icon class="el-icon--right"><ElIconEdit /></el-icon>
                                </el-link>
                                <el-link @click="onPublish(scope.row.id)">
                                    Publish <el-icon class="el-icon--right"><Promotion /></el-icon>
                                </el-link>
                            </el-space>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer>
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
            </el-footer>
        </el-container>
    </div>
    <Editor
        :id="editorDialog.id"
        :action="editorDialog.action"
        :visible="editorDialog.visible"
        @updated="onReset"
    />
</template>
<script setup>
import { Search as ElIconSearch, RefreshLeft as ElIconRefreshLeft, Edit as ElIconEdit, Plus as ElIconPlus, Clock, Promotion } from '@element-plus/icons'
import { pageNotification, sendNotification } from '@/api/member/notification'
import { ElMessageBox } from 'element-plus'
import { utcToLocal, localToUtc } from '@/utils'
import { $ref } from 'vue/macros'
import { onMounted, watch, ref } from 'vue'
import Editor from './Editor.vue'

const [editorDialog, showEditor] = useEditor()

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

onMounted(reloadTable)

watch(() => filter.createTime, newVal => {
  if (newVal[0]) {
    filter.condition.createTimeStart = localToUtc(newVal[0])
  }
  if (newVal[1]) {
    filter.condition.createTimeEnd = localToUtc(newVal[1])
  }
})

function reloadTable() {
  table.loading = true
  pageNotification({
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

function onSearch() {
  pager.page = 1
  pager.pageSize = 10
  reloadTable()
}

function onReset() {
  filter.condition = {}
  filter.createTime = []
  onSearch()
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
  showEditor('add')
}
function onEdit(id) {
  showEditor('edit', id)
}

function onPublish(id) {
  ElMessageBox.confirm('You will publish this notify to members, whether to continue?', 'Info', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    sendNotification(id).then(this.onReset)
  }).catch(() => {

  })
}

function toYesNoFilter(val) {
  return val ? 'Yes' : 'No'
}

function selectStatusTag(status) {
  const statusMap = {
    'DRAFT': 'warning',
    'PROCESS': 'info',
    'DONE': 'success',
    'FAIL': 'danger'
  }
  return statusMap[status]
}

function formatDatetime(datetime) {
  return utcToLocal(datetime)
}

function useEditor() {
  let action = ref('add')
  let visible = ref(false)
  let id = ref(null)
  return [
    {action, visible, id},
    (a, p) => {
      action.value = a
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
<style scoped>
.el-pagination {
  justify-content: center;
}
</style>
