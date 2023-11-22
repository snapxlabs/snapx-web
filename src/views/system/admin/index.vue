<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100%">
                <el-form
                    :inline="true"
                    :model="query"
                >
                    <el-form-item label="Username">
                        <el-input
                            v-model="query.username"
                            placeholder="filter by username"
                        />
                    </el-form-item>
                    <el-form-item label="Name">
                        <el-input
                            v-model="query.name"
                            placeholder="filter by name"
                        />
                    </el-form-item>
                    <el-form-item label="Phone">
                        <el-input
                            v-model="query.phone"
                            placeholder="filter by phone"
                        />
                    </el-form-item>
                    <el-form-item label="Mail">
                        <el-input
                            v-model="query.mail"
                            placeholder="filter by mail"
                        />
                    </el-form-item>
                    <el-form-item label="Status">
                        <el-select
                            v-model="query.enabled"
                            placeholder="filter is enabled"
                        >
                            <el-option
                                label="Enabled"
                                value="true"
                            />
                            <el-option
                                label="Disabled"
                                value="false"
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
            <el-main>
                <el-table
                    v-loading="listLoading"
                    :data="list"
                    element-loading-text="Loading"
                    :border="true"
                    fit
                    highlight-current-row
                >
                    <el-table-column
                        :align="center"
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
                        label="Username"
                        :align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.username }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Name"
                    >
                        <template #default="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Phone"
                        :align="center"
                    >
                        <template #default="scope">
                            {{ scope.row.phone }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Mail"
                        :align="center"
                    >
                        <template #default="scope">
                            {{ scope.row.mail }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        class-name="status-col"
                        label="Status"
                        width="110"
                        :align="center"
                    >
                        <template #default="scope">
                            <el-tag :type="statusFilter_filter(scope.row.enabled)">{{
                                enabledFilter_filter(scope.row.enabled)
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        prop="created_at"
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
                        prop="created_at"
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
                    :current-page="currPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="padding: 30px 0; text-align: center"
                    :total="totalCount"
                    @size-change="onPageSizeChange"
                    @current-change="onCurrentPageChange"
                />
            </el-footer>
        </el-container>
        <el-dialog
            v-model="dialogFormVisible"
            title="Add Admin"
            :width="formLabelWidth"
        >
            <el-form
                :model="form"
                :rules="rules"
            >
                <el-form-item
                    label="Username"
                    prop="username"
                >
                    <el-input
                        v-model="form.username"
                        :disabled="formAction == 'edit'"
                    />
                </el-form-item>
                <div v-if="formAction == 'add'">
                    <el-form-item
                        label="Password"
                        prop="passwordInput"
                    >
                        <el-input
                            v-model="form.passwordInput"
                            show-password
                        />
                    </el-form-item>
                    <el-form-item
                        label="Confrim Password"
                        prop="passwordConfirm"
                    >
                        <el-input
                            v-model="form.passwordConfirm"
                            show-password
                        />
                    </el-form-item>
                </div>
                <div v-if="formAction == 'edit'">
                    <el-form-item
                        label="Password"
                        prop="passwordInput"
                    >
                        <el-input
                            v-model="form.passwordInput"
                            placeholder="*******"
                            show-password
                            :disabled="passwordLock"
                        >
                            <template #append>
                                <el-button
                                    :icon="passwordLock ? 'el-icon-lock' : 'el-icon-unlock'"
                                    @click="switchPasswordLock"
                                />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        v-if="!passwordLock"
                        label="Confrim Password"
                        prop="passwordConfirm"
                    >
                        <el-input
                            v-model="form.passwordConfirm"
                            placeholder="*******"
                            show-password
                        />
                    </el-form-item>
                </div>
                <el-form-item label="Name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Phone">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="Mail">
                    <el-input v-model="form.mail" />
                </el-form-item>
                <el-form-item label="Remark">
                    <el-input
                        v-model="form.remark"
                        type="textarea"
                    />
                </el-form-item>
                <el-form-item label="Status">
                    <el-switch v-model="form.enabled" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="onAddCancel">Cancel</el-button>
                    <el-button
                        type="primary"
                        @click="onAddSubmit"
                    >Submit</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="js">
import { Search as ElIconSearch, RefreshLeft as ElIconRefreshLeft, Plus as ElIconPlus, Edit as ElIconEdit, Delete as ElIconDelete } from '@element-plus/icons'
import { pageAdminUser, createAdminUser, deleteAdminUser, findAdminUser, updateAdminUser } from '@/api/system/admin-user'
import { ElMessage as Message, ElMessageBox as MessageBox } from 'element-plus'
import { utcToLocal } from '@/utils'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      currPage: 1,
      pageSize: 10,
      totalCount: 0,
      query: {},
      formLabelWidth: '500px',
      dialogFormVisible: false,
      form: {
        enabled: true
      },
      formAction: null,
      passwordLock: true,
      rules: {
        username: [
          { required: true, message: 'please input username', trigger: 'blur' },
          { min: 3, max: 32, message: 'username length must between 3 and 32', trigger: 'blur' }
        ],
        passwordInput: [
          { required: true, message: 'please input password', trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: 'please confrim password', trigger: 'blur' }
        ]
      },
      ElIconSearch, ElIconRefreshLeft, ElIconPlus, ElIconEdit, ElIconDelete
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    formatDatetime(datetime) {
      return utcToLocal(datetime)
    },
    statusFilter_filter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    },
    enabledFilter_filter(enabled) {
      return enabled ? 'Enabled' : 'Disabled'
    },
    fetchData() {
      this.listLoading = true
      pageAdminUser({
        page: this.currPage,
        pageSize: this.pageSize,
        ... this.query
      }).then(response => {
        this.list = response.data.data
        this.listLoading = false
        this.currPage = response.data.currPage
        this.pageSize = response.data.pageSize
        this.totalCount = response.data.totalCount
      })
    },
    onSearch() {
      this.currPage = 1
      this.pageSize = 10
      this.fetchData()
    },
    onReset() {
      this.currPage = 1
      this.pageSize = 10
      this.query = {}
      this.fetchData()
    },
    onPageSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    onCurrentPageChange(val) {
      this.currPage = val
      this.fetchData()
    },
    onAdd() {
      this.formAction = 'add'

      this.dialogFormVisible = true
    },
    onEdit(id) {
      this.formAction = 'edit'
      this.restForm()
      this.switchPasswordLock(true)
      findAdminUser(id).then(response => {
        this.form = { ...response.data }
        this.dialogFormVisible = true
      })
    },
    onRemove(id) {
      MessageBox.confirm('You will remove this admin, whether to continue?', 'Info', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteAdminUser(id).then(this.onReset)
      }).catch(() => {

      })
    },
    onAddSubmit() {
      if (this.formAction === 'add') {
        createAdminUser({ ...this.form })
          .then(this.closeDalog)
          .then(this.onReset)
          .then(() => Message.success('Success create an admin'))
      } else if (this.formAction === 'edit') {
        const { id, ...data } = this.form
        updateAdminUser(id, data)
          .then(this.closeDalog)
          .then(this.onReset)
          .then(() => Message.success('Success update an admin'))
      } else {
        this.dialogFormVisible = false
        this.onReset()
      }
    },
    onAddCancel() {
      this.closeDalog()
    },
    closeDalog() {
      this.dialogFormVisible = false
    },
    restForm() {
      this.form = {
        enabled: true
      }
    },
    switchPasswordLock(lock) {
      if (lock === true || lock === false) {
        this.passwordLock = lock
      } else {
        this.passwordLock = !this.passwordLock
      }
      if (this.passwordLock) {
        delete this.form.passwordInput
        delete this.form.passwordConfirm
      }
    }
  }
}
</script>
<style scoped>
  .el-pagination {
    justify-content: center;
  }
</style>