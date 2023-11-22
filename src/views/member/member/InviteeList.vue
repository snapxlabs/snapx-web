<template>
    <el-dialog
        v-model="visible"
        @open="onDialogOpen"
        @close="onDialogClose"
    >
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
                label="ID"
                width="200"
            >
                <template #default="scope">
                    {{ scope.row.member.id }}
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
                label="Avatar"
            >
                <template #default="scope">
                    <el-image v-if="scope.row.member.avatar" style="width: 50px;" :src="scope.row.avatar" fit="contain" />
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
                label="Inviter Bonus"
            >
                <template #default="scope">
                    {{ scope.row.inviterGiftCount }}
                </template>
            </el-table-column>
            <el-table-column
                :align="center"
                label="Invitee Bonus"
            >
                <template #default="scope">
                    {{ scope.row.inviteeGiftCount }}
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination
                :current-page="pager.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pager.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                style="padding: 30px 0; text-align: center"
                :total="pager.count"
                @current-change="onPageChange"
                @size-change="onPageSizeChange"
            /> -->
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { $ref, defineProps } from 'vue/macros'
import { pageInviteeMember } from '@/api/member/member'

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
  filter.condition.inviterMemberId = props.id
  table.loading = true
  reloadTable()
}

function onDialogClose() {

}

function reloadTable() {
  pageInviteeMember({
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

// function onPageChange(page) {
//   pager.page = page
//   reloadTable()
// }

// function onPageSizeChange(pageSize) {
//   pager.pageSize = pageSize
//   reloadTable()
// }
</script>