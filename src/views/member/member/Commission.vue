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
            <el-form-item label="Type">
                <el-select v-model="filter.condition.accountType" placeholder="Select" @change="onTypeChange">
                    <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
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
                width="95"
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
                    {{ scope.row.details.subject }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Ivitee"
            >
                <template #default="scope">
                    {{ scope.row.invitee.nickname }}({{ scope.row.invitee.account }})
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Ivitee Income"
            >
                <template #default="scope">
                    {{ scope.row.inviteeIncomeAmount }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Inviter Commission"
            >
                <template #default="scope">
                    {{ scope.row.inviterCommissionAmount }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Sharing Ratio"
            >
                <template #default="scope">
                    {{ scope.row.sharingRatio }}%
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
</template>

<script setup>
import { ref } from 'vue'
import { $ref, defineProps } from 'vue/macros'
import { pageInviterCommission } from '@/api/member/member'

const props = defineProps({
  visible: ref(false),
  id: ref(null),
})

let visible = $ref(props.visible)

let options = $ref(['POINTS', 'USDC'])

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
  filter.condition.accountType = options[0]
  filter.condition.inviterMemberId = props.id
  table.loading = true
  reloadTable()
}

function onDialogClose() {

}

function onTypeChange(val) {
  filter.condition.accountType = val
  table.loading = true
  reloadTable()
}

function reloadTable() {
  pageInviterCommission({
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