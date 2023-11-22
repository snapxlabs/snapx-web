<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100%">
                <Statistics />
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
                    <el-form-item label="Virtual User">
                        <el-select
                            v-model="filter.condition.virtualUser"
                            placeholder="filter is virtual user"
                        >
                            <el-option
                                label="Yes"
                                value="true"
                            />
                            <el-option
                                label="No"
                                value="false"
                            />
                        </el-select>
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
                        label="Level"
                        width="70"
                    >
                        <template #default="scope">
                            {{ scope.row.level }}
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
                        label="Invited"
                        width="70"
                    >
                        <template #default="scope">
                            <div v-if="scope.row.inviteeCount > 0">
                                <el-link type="info" @click="onView(scope.row.id)">
                                    {{ scope.row.inviteeCount }} <el-icon class="el-icon--right"><icon-view /></el-icon>
                                </el-link>
                            </div>
                            <div v-else>
                                <el-link type="info" disabled>
                                    {{ scope.row.inviteeCount }}
                                </el-link>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Inviter"
                    >
                        <template #default="scope">
                            <span>{{ getInviterMemberInfo(scope.row.inviterMember) }}</span>
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
                        :align="center"
                        label="Update Time"
                    >
                        <template #default="scope">
                            <el-icon><Clock /></el-icon>
                            <span>{{ formatDatetime(scope.row.updateTime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Last Access Time"
                    >
                        <template #default="scope">
                            <template v-if="scope.row.lastAccessTime">
                                <el-icon><Clock /></el-icon>
                                <span>{{ formatDatetime(scope.row.lastAccessTime) }}</span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Virtual"
                        width="70"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="item"
                                effect="dark"
                                :content="scope.row.freezeReason"
                                placement="bottom"
                                :disabled="scope.row.freezeReason === null"
                            >
                                <el-tag :type="freezeTag_filter(scope.row.virtualUser)">
                                    {{ isFreeze_filter(scope.row.virtualUser) }}
                                </el-tag>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Freeze"
                        width="70"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="item"
                                effect="dark"
                                :content="scope.row.freezeReason"
                                placement="bottom"
                                :disabled="scope.row.freezeReason === null"
                            >
                                <el-tag :type="virtualUserTag_filter(scope.row.freeze)">
                                    {{ virtualUser_filter(scope.row.freeze) }}
                                </el-tag>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Operation"
                        width="260"
                        :align="center"
                    >
                        <template #default="scope">
                            <el-space wrap>
                                <el-link type="primary" @click="onEdit(scope.row.id)">
                                    Edit <el-icon class="el-icon--right"><ElIconEdit /></el-icon>
                                </el-link>
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="scope.row.freezeReason"
                                    placement="bottom"
                                    :disabled="scope.row.freezeReason === null"
                                >
                                    <el-link
                                        :type="freezeButton_filter(scope.row.freeze)"
                                        @click="onFreeze(scope.row.id, scope.row.freeze)"
                                    >
                                        {{ isFreezeButton_filter(scope.row.freeze) }} <el-icon class="el-icon--right"><Lock /></el-icon>
                                    </el-link>
                                </el-tooltip>
                                <div v-if="scope.row.inviteeCount > 0">
                                    <el-link type="info" @click="onCommission(scope.row.id)">
                                        Commission <el-icon class="el-icon--right"><Coin /></el-icon>
                                    </el-link>
                                </div>
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
    <InviteeList
        :id="inviteeListDialog.id"
        :visible="inviteeListDialog.visible"
    />
    <Commission
        :id="commissionDialog.id"
        :visible="commissionDialog.visible"
    />
</template>
<script setup>
import { Search as ElIconSearch, RefreshLeft as ElIconRefreshLeft, Edit as ElIconEdit, Plus as ElIconPlus, View as IconView, Clock, Lock, Coin } from '@element-plus/icons'
import { pageMember, updateMemberFreeze } from '@/api/member/member'
import { ElMessageBox } from 'element-plus'
import { utcToLocal, localToUtc } from '@/utils'
import { $ref } from 'vue/macros'
import { onMounted, watch, ref } from 'vue'
import Commission from './Commission.vue'
import InviteeList from './InviteeList.vue'
import Statistics from './Statistics.vue'
import Editor from './Editor.vue'

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

const [commissionDialog, showCommissionDialog] = useCommission()
const [inviteeListDialog, showInviteeListDialog] = useInviteeList()
const [editorDialog, showEditor] = useEditor()

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
  pageMember({
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

function onView(id) {
  showInviteeListDialog(id)
}

function onCommission(id) {
  showCommissionDialog(id)
}

function onAdd() {
  showEditor('add')
}
function onEdit(id) {
  showEditor('edit', id)
}

function onFreeze(id, status) {
  if (status === false) {
    ElMessageBox.prompt('please input freeze reason', 'Freeze Member', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Close'
    }).then(({ value }) => {
      updateMemberFreeze(id, { freeze: true, freezeReason: value }).then(() => {
        onPageChange(pager.page)
      })
    })
  } else {
    ElMessageBox.confirm('You will unfreeze this member, whether to continue?', 'Unfreeze Member', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      updateMemberFreeze(id, { freeze: false }).then(() => {
        onPageChange(pager.page)
      })
    })
  }
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

function useInviteeList() {
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

function useCommission() {
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

function getInviterMemberInfo(inviterMember) {
  if (inviterMember) {
    return `${inviterMember.nickname}(${inviterMember.account})`
  }
  return ''
}

function identity_filter(identity) {
  const statusMap = {
    'GENERAL': 'success',
    'AGENT': 'danger'
  }
  return statusMap[identity]
}

function freezeButton_filter(freeze) {
  const statusMap = {
    true: 'success',
    false: 'danger'
  }
  return statusMap[freeze]
}

function isFreezeButton_filter(freeze) {
  return freeze ? 'Unfreeze' : 'Freeze'
}

function freezeTag_filter(freeze) {
  const statusMap = {
    true: 'danger',
    false: 'success'
  }
  return statusMap[freeze]
}

function isFreeze_filter(freeze) {
  return freeze ? 'Yes' : 'No'
}

function virtualUserTag_filter(freeze) {
  const statusMap = {
    true: 'danger',
    false: 'success'
  }
  return statusMap[freeze]
}

function virtualUser_filter(freeze) {
  return freeze ? 'Yes' : 'No'
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
