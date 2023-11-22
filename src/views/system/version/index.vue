<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100px">
                <el-form
                    :inline="true"
                    :model="query"
                >
                    <el-form-item label="Platform">
                        <el-select
                            v-model="query.platform"
                            placeholder="filter is platform"
                        >
                            <el-option
                                label="ANDROID"
                                value="ANDROID"
                            />
                            <el-option
                                label="IOS"
                                value="IOS"
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
                        size="medium"
                        :icon="ElIconPlus"
                        @click="onAdd"
                    >Add</el-button>
                </el-row>
            </el-header>
            <el-main>
                <el-table
                    ref="tb"
                    v-loading="listLoading"
                    :data="list"
                    element-loading-text="Loading"
                    :border="true"
                    fit
                    highlight-current-row
                >
                    <el-table-column
                        align="center"
                        label="No"
                        width="55"
                    >
                        <template #default="scope">
                            {{ scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Platform"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.platform }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Version Number"
                        align="center"
                    >
                        <template #default="scope">
                            {{ scope.row.versionNumber }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Version Type"
                        align="center"
                    >
                        <template #default="scope">
                            {{ scope.row.versionType }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Version Description"
                        align="center"
                        :show-overflow-tooltip="true"
                    >
                        <template #default="scope">
                            {{ scope.row.versionDescription }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="onlineTime"
                        label="Online Time"
                        width="150"
                    >
                        <template #default="scope">
                            <el-icon><Clock /></el-icon>
                            <span v-if="scope.row.onlineTime">{{ formatDatetime(scope.row.onlineTime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="createTime"
                        label="Create Time"
                        width="150"
                    >
                        <template #default="scope">
                            <el-icon><Clock /></el-icon>
                            <span>{{ formatDatetime(scope.row.createTime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="updateTime"
                        label="Update Time"
                        width="150"
                    >
                        <template #default="scope">
                            <el-icon><Clock /></el-icon>
                            <span>{{ formatDatetime(scope.row.updateTime) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Operation"
                        width="250"
                        align="center"
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
                    align="center"
                    :current-page="currPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    style="padding: 30px 0; text-align: center; justify-content: center"
                    :total="totalCount"
                    @size-change="onPageSizeChange"
                    @current-change="onCurrentPageChange"
                />
            </el-footer>
        </el-container>
        <el-dialog
            v-model="dialogFormVisible"
            :title="title"
            :width="formLabelWidth"
        >
            <el-form
                :model="form"
                :rules="rules"
            >
                <el-form-item label-width="150px" label="Platform" prop="platform">
                    <el-select
                            v-model="form.platform"
                            placeholder="please select platform"
                    >
                        <el-option
                            label="ANDROID"
                            value="ANDROID"
                        />
                        <el-option
                            label="IOS"
                            value="IOS"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label-width="150px" label="Version Number" prop="versionNumber">
                    <el-input v-model="form.versionNumber" placeholder="please input version number,example 1.0.1"/>
                </el-form-item>
                <el-form-item label-width="150px" label="Version Type" prop="versionType">
                    <el-select
                            v-model="form.versionType"
                            placeholder="please select version type"
                    >
                        <el-option
                            label="FORCE"
                            value="FORCE"
                        />
                        <el-option
                            label="PROMPT"
                            value="PROMPT"
                        />
                        <el-option
                            label="NORMAL"
                            value="NORMAL"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label-width="150px" label="Version Description">
                    <el-input v-model="form.versionDescription" type="textarea"/>
                </el-form-item>
                <el-form-item label-width="150px" label="Online Time">
                    <el-date-picker v-model="form.onlineTime" type="datetime" placeholder="please select online time"
                     format="YYYY-MM-DD HH:mm:ss"  value-format="YYYY-MM-DD HH:mm:ss"/>
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
  import { Search as ElIconSearch, RefreshLeft as ElIconRefreshLeft, Plus as ElIconPlus, Edit as ElIconEdit, Delete as ElIconDelete, Download as ElIconDownload } from '@element-plus/icons'
  import { pageVersion,createVersion,editVersion,deleteVersion,getVersion} from '@/api/system/version'
  import { utcToLocal} from '@/utils'
  import { ElMessage as Message, ElMessageBox as MessageBox } from 'element-plus'
  
  export default {

  data() {
    return {
      list: null,
      listLoading: true,
      currPage: 1,
      pageSize: 10,
      totalCount: 0,
      query: {},
      rowSelectionId:'',
      radioCheckList: [],
      title:'',
      formLabelWidth: '800px',
      dialogFormVisible: false,
      form: {},
      formAction: null,
      rules: {
        platform: [
            { required: true, message: 'please select platform', trigger: 'blur' }
        ],
        versionNumber: [
            { required: true, message: 'please input version number', trigger: 'blur' }
        ],
        versionType: [
            { required: true, message: 'please select version type', trigger: 'blur' }
        ]
      },
      ElIconSearch, ElIconRefreshLeft, ElIconPlus, ElIconEdit, ElIconDelete, ElIconDownload
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    formatDatetime(datetime) {
      return utcToLocal(datetime)
    },
    fetchData() {
      this.listLoading = true
      pageVersion({
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
    onSelectionChange(row) {
        this.rowSelectionId = row.id
        this.radioCheckList = row   
    },
    onAdd() {
        this.title = 'Add Version'
        this.formAction = 'add'
        this.restForm()
        this.dialogFormVisible = true
    },
    onEdit(id) {
        this.title = 'Edit Version'
        this.formAction = 'edit'
        this.restForm()
        getVersion(id).then(response => {
            this.form = { ...response.data }
            this.dialogFormVisible = true
        })
    },
    onRemove(id) {
        MessageBox.confirm('You will remove this Version, whether to continue?', 'Info', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            deleteVersion(id).then(this.onReset)
        }).catch(() => {

        })
    },
    onAddSubmit() {
        if (this.formAction === 'add') {
            createVersion({ ...this.form })
            .then(this.closeDalog)
            .then(this.onReset)
            .then(() => Message.success('Create Version Successed '))
        } else if (this.formAction === 'edit') {
            const { id, ...data } = this.form
            editVersion(id, data)
            .then(this.closeDalog)
            .then(this.onReset)
            .then(() => Message.success('Edit Version Successed'))
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
        this.form = {}
    }
  }
  }
  </script>
<style lang='scss'>
.el-input__wrapper {
  width: 345px;
}
</style>
