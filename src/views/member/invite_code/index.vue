<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100%">
                <el-button
                    type="primary"
                    size="small"
                    :icon="ElIconPlus"
                    @click="onAdd"
                >Add</el-button>
            </el-header>
            <el-main>
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
                        label="CODE"
                        width="200"
                    >
                        <template #default="scope">
                            {{ scope.row.id }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="URL"
                    >
                        <template #default="scope">
                            {{ scope.row.content }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Used"
                        width="95"
                    >
                        <template #default="scope">
                            <el-tag :type="isCodeUsed(scope.row) ? 'success' : 'danger'">
                                {{ isCodeUsed(scope.row) ? "Yes" : "No" }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Use Limit"
                        width="95"
                    >
                        <template #default="scope">
                            {{ isUnlimited(scope.row) ? "unlimited" : scope.row.useLimit }}
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
        <el-dialog
            v-model="visible"
            title="Create Invite Code"
            width="500px"
            @close="onDialogClose"
        >
            <el-form
                ref="ruleFormRef"
                :model="form"
                :rules="rules"
                label-width="100px"
                label-position="top"
            >
                <el-form-item label="Num" prop="Num">
                    <el-input-number v-model="form.num" :min="1" :max="99" />
                </el-form-item>
                <el-form-item label="unlimited">
                    <el-switch v-model="form.unlimited" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="onCancel">Cancel</el-button>
                    <el-button
                        type="primary"
                        @click="onSubmit"
                    >Submit</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { $ref } from 'vue/macros'
import { onMounted } from 'vue'
import { pageInviteCode, bathCreateInviteCode } from '@/api/member/invite_code'
import { ElMessage } from 'element-plus'
import { utcToLocal } from '@/utils'

let tableLoding = $ref(false)
let condition = $ref({})
let dataList = $ref([])
let page = $ref(1)
let pageSize = $ref(10)
let count = $ref(0)
let visible = $ref(false)
let form = $ref({
  num: 1,
  unlimited: false
})

onMounted(reloadTable)

function reloadTable() {
  tableLoding = true
  pageInviteCode({
    page: page,
    pageSize: pageSize,
    ...condition,
  }).then((response) => {
    dataList = response.data.data
    tableLoding = false
    page = response.data.currPage
    pageSize = response.data.pageSize
    count = response.data.totalCount
  })
}

function onPageChange(p) {
  page = p
  reloadTable()
}

function onPageSizeChange(ps) {
  pageSize = ps
  reloadTable()
}

function isCodeUsed(inviteCode) {
  return inviteCode.usedCount > 0
}

function isUnlimited(inviteCode) {
  return inviteCode.useLimit === 0
}

function onAdd() {
  visible = true
}

function onSubmit() {
  bathCreateInviteCode({ ...form })
    .then(showSuccessMessage)
    .then(triggerUpdate)
}

function onCancel() {
  closeDalog()
}

function closeDalog() {
  visible = false
}

function showSuccessMessage() {
  ElMessage.success('Success Create Invite Code')
}

function triggerUpdate() {
  closeDalog()
  reloadTable()
}

function onDialogClose() {
  cleanForm()
}

function cleanForm() {
  form = {
    num: 1
  }
}

function formatDatetime(datetime) {
  return utcToLocal(datetime)
}
</script>
<style scoped>
  .el-pagination {
    justify-content: center;
  }
</style>