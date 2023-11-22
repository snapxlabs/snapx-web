<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100%">
                <el-form
                    :inline="true"
                    :model="condition"
                >
                    <el-form-item label="Title">
                        <el-input
                            v-model="condition.title"
                            placeholder="filter by title"
                        />
                    </el-form-item>
                    <el-form-item label="Summary">
                        <el-input
                            v-model="condition.summary"
                            placeholder="filter by summary"
                        />
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
                    </el-form-item>
                </el-form>
                <el-row>
                    <el-button
                        type="primary"
                        size="small"
                        :icon="ElIconPlus"
                        @click="onAdd"
                    >Add</el-button>
                </el-row>
            </el-header>
            <el-main height="">
                <el-table
                    v-loading="tableLoding"
                    :data="dataList"
                    element-loading-text="Loading"
                    :border="true"
                    fit
                    highlight-current-row
                >
                    <el-table-column
                        :align="center"
                        type="index"
                        label="No"
                        width="95"
                    >
                        <template #default="scope">
                            {{ scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="ID"
                        width="200"
                    >
                        <template #default="scope">
                            {{ scope.row.id }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Title"
                    >
                        <template #default="scope">
                            {{ scope.row.title }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Summary"
                    >
                        <template #default="scope">
                            {{ scope.row.summary }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Publish"
                    >
                        <template #default="scope">
                            <el-tag :type="scope.row.publish ? 'success' : 'danger'">
                                {{ scope.row.publish ? "Yes" : "No" }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Create Time"
                    >
                        <template #default="scope">
                            <el-icon><Clock /></el-icon>
                            <span>{{ utcToLocal(scope.row.createTime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Update Time"
                    >
                        <template #default="scope">
                            <el-icon><Clock /></el-icon>
                            <span>{{ utcToLocal(scope.row.updateTime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Operation"
                        width="250"
                        :align="center"
                    >
                        <template #default="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                :icon="ElIconEdit"
                                @click="onEdit(scope.row.id)"
                            >Edit</el-button>
                            <el-button
                                type="danger"
                                size="mini"
                                :icon="ElIconDelete"
                                @click="onRemove(scope.row.id)"
                            >Remove</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer>
                <el-pagination
                    :current-page="page"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="padding: 30px 0; text-align: center"
                    :total="count"
                    @current-change="onPageChange"
                    @size-change="onPageSizeChange"
                />
            </el-footer>
        </el-container>
        <Editor
            :id="editor.id"
            :action="editor.action"
            :title="editor.title"
            :visible="editor.visible"
            @updated="onSearch"
        />
    </div>
</template>

<script setup>
import { $ref } from 'vue/macros'
import { ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import Editor from './Editor.vue'
import { pageContentInformation, deleteContentInformation } from '@/api/system/content-information'
import { Search as ElIconSearch, RefreshLeft as ElIconRefreshLeft, Plus as ElIconPlus, Edit as ElIconEdit, Delete as ElIconDelete, Clock} from '@element-plus/icons'
import { utcToLocal } from '@/utils'

let tableLoding = $ref(false)
let condition = $ref({})
let dataList = $ref([])
let page = $ref(1)
let pageSize = $ref(10)
let count = $ref(0)

onMounted(reloadTable)

function reloadTable() {
  tableLoding = true
  pageContentInformation({
    ...condition,
  }).then((response) => {
    dataList = response.data.data
    tableLoding = false
    page = response.data.currPage
    pageSize = response.data.pageSize
    count = response.data.totalCount
  })
}

function onSearch() {
  page = 1
  pageSize = 10
  reloadTable()
}

function onReset() {
  condition = {}
  onSearch()
}

function onPageChange(p) {
  page = p
  reloadTable()
}

function onPageSizeChange(ps) {
  pageSize = ps
  reloadTable()
}

const [editor, onAdd, onEdit] = useEditor()

function useEditor() {
  const action = ref('add')
  const title = ref('Create Notice')
  const visible = ref(false)
  const id = ref(null)

  return [
    { action, title, visible, id },
    () => {
      action.value = 'add'
      title.value = 'Create Notice'
      visible.value = true
    },
    (contentId) => {
      action.value = 'edit'
      title.value = 'Edit Notice'
      visible.value = true
      id.value = contentId
    },
  ]
}

function onRemove(id) {
  ElMessageBox.confirm('You will remove this Notice, whether to continue?', 'Info', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    deleteContentInformation(id).then(onSearch)
  })
}
</script>
<style scoped>
  .el-pagination {
    justify-content: center;
  }
</style>