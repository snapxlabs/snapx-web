<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100%">
                <el-form
                    :inline="true"
                    :model="condition"
                >
                    <el-form-item label="Time">
                        <el-date-picker
                            v-model="time"
                            type="daterange"
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
                    v-loading="tableLoding"
                    :data="dataList"
                    element-loading-text="Loading"
                    :border="true"
                    fit
                    highlight-current-row
                >
                    <el-table-column
                        :align="center"
                        label="Access Time"
                        width="200"
                    >
                        <template #default="scope">
                            {{ formatDatetime(scope.row.time) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="UV"
                    >
                        <template #default="scope">
                            {{ scope.row.count }}
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
    </div>
</template>
<script setup>
import { $ref } from 'vue/macros'
import { onMounted, watch } from 'vue'
import { pageEventPerMonth } from '@/api/member/member'
import { localToUtc } from '@/utils'
import moment from 'moment'


let tableLoding = $ref(false)
let time = $ref([])
let condition = $ref({})
let dataList = $ref([])
let page = $ref(1)
let pageSize = $ref(10)
let count = $ref(0)

onMounted(reloadTable)
watch(time, newVal => {
  if (newVal[0]) {
    condition.startTime = localToUtc(newVal[0])
  }
  if (newVal[1]) {
    condition.endTime = localToUtc(newVal[1])
  }
})

function reloadTable() {
  tableLoding = true
  pageEventPerMonth({
    'event': 'MEMBER_MONTH_ACCESS',
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
  reloadTable()
}

function onReset() {
  time = []
}

function onPageChange(p) {
  page = p
  reloadTable()
}

function onPageSizeChange(ps) {
  pageSize = ps
  reloadTable()
}

function formatDatetime(datetime) {
  const fmt = 'YYYY-MM'
  return moment.utc(datetime).format(fmt)
}
</script>
<style scoped>
  .el-pagination {
    justify-content: center;
  }
</style>