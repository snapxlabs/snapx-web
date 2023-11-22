<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100%">
                <el-form
                    :inline="true"
                    :model="filter.condition"
                >
                    <el-form-item label="Account">
                        <el-input
                            v-model="filter.condition.account"
                            placeholder="filter by account"
                        />
                    </el-form-item>
                    <el-form-item label="Nickname">
                        <el-input
                            v-model="filter.condition.nickname"
                            placeholder="filter by nickname"
                        />
                    </el-form-item>
                    <el-form-item label="Phone">
                        <el-input
                            v-model="filter.condition.phone"
                            placeholder="filter by phone"
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
                            {{ scope.row.member.id }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Identity"
                        width="110"
                    >
                        <template #default="scope">
                            <el-tag :type="identity_filter(scope.row.identity)">
                                {{ scope.row.member.identity }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Avatar"
                        width="75"
                    >
                        <template #default="scope">
                            <el-image v-if="scope.row.avatar" style="width: 50px;" :src="scope.row.avatar" fit="contain" />
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Account"
                    >
                        <template #default="scope">
                            {{ scope.row.member.account }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Phone"
                    >
                        <template #default="scope">
                            <span v-if="scope.row.member.phone">
                                +{{ scope.row.member.phoneAreaCode }}-{{ scope.row.member.phone }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Nickname"
                    >
                        <template #default="scope">
                            {{ scope.row.member.nickname }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Balance"
                    >
                        <template #default="scope">
                            {{ scope.row.accounts.balance }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Operation"
                        width="260"
                        :align="center"
                    >
                        <template #default="scope">
                            <el-space wrap>
                                <el-link type="primary" @click="onDetails(scope.row.member.id)">
                                    Details <el-icon class="el-icon--right"><ElIconEdit /></el-icon>
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
    <Details
        :id="detailsDialog.id"
        :visible="detailsDialog.visible"
    />
</template>
<script setup>
import { Search as ElIconSearch, RefreshLeft as ElIconRefreshLeft, Edit as ElIconEdit } from '@element-plus/icons'
import { pageAccounts } from '@/api/trade/usdc-accounts'
import { localToUtc } from '@/utils'
import { $ref } from 'vue/macros'
import { onMounted, watch, ref } from 'vue'
import Details from './Details.vue'

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

const [detailsDialog, showDetailsDialog] = useDetails()

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
  pageAccounts({
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

function onDetails(id) {
  showDetailsDialog(id)
}

function useDetails() {
  let visible = ref(false)
  let id = ref(null)
  return [
    {visible, id},
    i => {
      id.value = i
      visible.value = true
    }
  ]
}

function identity_filter(identity) {
  const statusMap = {
    'GENERAL': 'success',
    'AGENT': 'danger'
  }
  return statusMap[identity]
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
