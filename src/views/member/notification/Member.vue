<template>
    <el-dialog
        v-model="visible"
        @open="onDialogOpen"
        @close="onDialogClose"
    >
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
                        <el-form-item label="Create Time">
                            <el-date-picker
                                v-model="filter.createTime"
                                type="datetimerange"
                                range-separator="to"
                                start-placeholder="Start Date"
                                end-placeholder="End Date"
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
                            label="Identity"
                            width="110"
                        >
                            <template #default="scope">
                                <el-tag :type="identity_filter(scope.row.identity)">
                                    {{ scope.row.identity }}
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
                                {{ scope.row.account }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :align="center"
                            label="Phone"
                        >
                            <template #default="scope">
                                <span v-if="scope.row.phone">
                                    +{{ scope.row.phoneAreaCode }}-{{ scope.row.phone }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :align="center"
                            label="Nickname"
                        >
                            <template #default="scope">
                                {{ scope.row.nickname }}
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
                        <el-table-column
                            label="Operation"
                            :align="center"
                        >
                            <template #default="scope">

                                <el-space wrap>
                                    <el-link v-if="memberIdList == null || !memberIdList.includes(scope.row.id)" type="primary" @click="onAdd(scope.row.id)">
                                        Add <el-icon class="el-icon--right"><ElIconPlus /></el-icon>
                                    </el-link>
                                    <el-link v-if="memberIdList != null && memberIdList.includes(scope.row.id)" type="danger" @click="onRemove(scope.row.id)">
                                        Remove <el-icon class="el-icon--right"><ElIconRemove /></el-icon>
                                    </el-link>
                                </el-space>
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
                    <el-divider content-position="left">Selected Member</el-divider>
                    <el-table
                        v-loading="selTable.loading"
                        :data="selTable.dataList"
                        element-loading-text="Loading"
                        :border="true"
                        fit
                        highlight-current-row
                    >
                        <el-table-column
                            :align="center"
                            label="Identity"
                            width="110"
                        >
                            <template #default="scope">
                                <el-tag :type="identity_filter(scope.row.identity)">
                                    {{ scope.row.identity }}
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
                                {{ scope.row.account }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :align="center"
                            label="Phone"
                        >
                            <template #default="scope">
                                <span v-if="scope.row.phone">
                                    +{{ scope.row.phoneAreaCode }}-{{ scope.row.phone }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :align="center"
                            label="Nickname"
                        >
                            <template #default="scope">
                                {{ scope.row.nickname }}
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
                        <el-table-column
                            label="Operation"
                            :align="center"
                        >
                            <template #default="scope">
                                <el-space wrap>
                                    <el-link type="danger" @click="onRemove(scope.row.id)">
                                        Remove <el-icon class="el-icon--right"><ElIconRemove /></el-icon>
                                    </el-link>
                                </el-space>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        :current-page="selPager.page"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="selPager.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        style="padding: 30px 0; text-align: center"
                        :total="selPager.count"
                        @current-change="onSelPageChange"
                        @size-change="onSelPageSizeChange"
                    />
                </el-main>
            </el-container>
        </div>
    </el-dialog>
</template>
<script setup>
import { Search as ElIconSearch, RefreshLeft as ElIconRefreshLeft, Remove as ElIconRemove, Plus as ElIconPlus, Clock } from '@element-plus/icons'
import { pageMember } from '@/api/member/member'
import { utcToLocal, localToUtc } from '@/utils'
import { $ref, defineProps } from 'vue/macros'
import { watch, ref } from 'vue'

const props = defineProps({
  visible: ref(false),
  memberIdList: ref([]),
})
const emits = defineEmits(['updated'])

let visible = $ref(props.visible)
let memberIdList = $ref(props.memberIdList)

function onDialogOpen() {
  onReset()
  selPager.page = 1
  selPager.pageSize = 10
  reloadSelTable()
}

function onDialogClose() {
  triggerUpdate()
}

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

let selTable = $ref({
  loading: true,
  dataList: []
})
let selPager = $ref({
  page: 1,
  pageSize: 10,
  count: 0
})

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
  pageMember({
    page: pager.page,
    pageSize: pager.pageSize,
    virtualUser: false,
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

function reloadSelTable() {
  selTable.loading = true
  if (!memberIdList || memberIdList.length === 0) {
    selTable.dataList = []
    selTable.loading = false
    selPager.page = 1
    selPager.pageSize = 10
    selPager.count = 0
  } else {
    pageMember({
      page: selPager.page,
      pageSize: selPager.pageSize,
      virtualUser: false,
      memberIdList: memberIdList.join(',')
    }).then(response => {
      selTable.dataList = response.data.data
      selTable.loading = false
      selPager.page = response.data.currPage
      selPager.pageSize = response.data.pageSize
      selPager.count = response.data.totalCount
    })
  }
}

function onSelPageChange(page) {
  selPager.page = page
  reloadSelTable()
}

function onSelPageSizeChange(pageSize) {
  selPager.pageSize = pageSize
  reloadSelTable()
}

function identity_filter(identity) {
  const statusMap = {
    'GENERAL': 'success',
    'AGENT': 'danger'
  }
  return statusMap[identity]
}

function formatDatetime(datetime) {
  return utcToLocal(datetime)
}

function onAdd(id) {
  if (!memberIdList) {
    memberIdList = []
  }
  memberIdList.push(id)
  reloadSelTable()
}

function onRemove(id) {
  memberIdList = memberIdList.filter(item => item !== id)
  reloadSelTable()
}

function triggerUpdate() {
  emits('updated')
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
