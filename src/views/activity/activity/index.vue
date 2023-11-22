<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100px">
                <el-form
                    :inline="true"
                    :model="query"
                >
                    <el-form-item label="Name">
                        <el-input
                            v-model="query.name"
                            placeholder="filter by name"
                        />
                    </el-form-item>
                    <el-form-item label="Is Special">
                        <el-select
                            v-model="query.isSpec"
                            placeholder="filter is special"
                        >
                            <el-option
                                label="YES"
                                value="true"
                            />
                            <el-option
                                label="NO"
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
                        size="medium"
                        :icon="ElIconPlus"
                        @click="onAdd"
                    >Add</el-button>
                    <el-button
                        type="primary"
                        size="medium"
                        :icon="ElIconDownload"
                        @click="onDownload"
                    >Download</el-button>
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
                    @row-click="onSelectionChange"
                >
                    <el-table-column align="center" width="55" label="Select">
                        <template #default="scope">
                            <el-radio class="radio" v-model="rowSelectionId" :label="scope.row.id" >
                                <span></span> 
                            </el-radio>
                        </template>
                    </el-table-column>
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
                        label="Name"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="startDate"
                        label="Start Date"
                        width="100"
                    >
                        <template #default="scope">
                            <el-icon><Clock/></el-icon>
                            <span >{{ formatDate(scope.row.startDate) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="End Date"
                        width="100"
                    >
                        <template #default="scope">
                            <el-icon><Clock /></el-icon>
                            <span>{{ formatDate(scope.row.endDate) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        class-name="status-col"
                        label="Is Special"
                        width="80"
                        align="center"
                    >
                        <template #default="scope">
                          <div style="text-align:center">
                            <el-tag  :type="specFilter_filter(scope.row.isSpec)">{{
                                isSpecFilter_filter(scope.row.isSpec)
                            }}</el-tag>
                          </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        class-name="status-col"
                        label="Is Enabled"
                        width="80"
                        align="center"
                    >
                        <template #default="scope">
                        <div style="text-align:center">
                            <el-tag  :type="enabledFilter_filter(scope.row.isEnabled)">{{
                                isEnabledFilter_filter(scope.row.isEnabled)
                            }}</el-tag>
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Qr Code"
                        align="center"
                        width="140"
                    >
                        <template #default="scope">
                            <el-image :src="'data:image/png;base64,'+ scope.row.qrCodeBase64" />
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Position"
                        align="center"
                    >
                        <template #default="scope">
                            {{ scope.row.position }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Instruction"
                        align="center"
                        :show-overflow-tooltip="true"
                    >
                        <template #default="scope">
                            {{ scope.row.instruction }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Sort"
                        align="center"
                    >
                    <template #default="scope">
                        {{ scope.row.sort }}
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
                <el-form-item label-width="115px" label="Activity Name"  prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label-width="115px" label="Start Date">
                    <el-date-picker v-model="form.startDate" type="date" placeholder="please select start date" :disabled-date="onStartDateAfter" format="YYYY-MM-DD"  value-format="YYYY-MM-DD"/>
                </el-form-item>
                <el-form-item label-width="115px" label="End Date">
                    <el-date-picker v-model="form.endDate" type="date" placeholder="please select end date" :disabled-date="onEndDateAfter" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item label-width="115px" label="position" prop="position">
                    <el-input v-model="form.position" placeholder="please input position,example:lat,lng"/>
                </el-form-item>
                <el-form-item label-width="115px" label="Is Special">
                    <el-switch v-model="form.isSpec"/>
                </el-form-item>
                <el-form-item label-width="115px" label="Is Enabled">
                    <el-switch v-model="form.isEnabled"/>
                </el-form-item>
                <el-form-item label-width="115px" label="Sort">
                    <el-input v-model="form.sort" />
                </el-form-item>
                <el-form-item label-width="115px" label="Instruction">
                    <el-input v-model="form.instruction" type="textarea"/>
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
  import { pageActivity,createActivity,editActivity,deleteActivity,getActivity,getActivitySvg} from '@/api/activity/activity'
  import { utcToLocal,utcToLocalDate } from '@/utils'
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
      formLabelWidth: '500px',
      dialogFormVisible: false,
      form: {
        isEnabled: false,
        isSpec: false
      },
      formAction: null,
      rules: {
        name: [
            { required: true, message: 'please input activity name', trigger: 'blur' },
            { min: 1, max: 32, message: 'activity name length must between 3 and 32', trigger: 'blur' }
        ],
        position: [
            { required: true, message: 'please input activity position', trigger: 'blur' }
        ]
      },
      ElIconSearch, ElIconRefreshLeft, ElIconPlus, ElIconEdit, ElIconDelete, ElIconDownload
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onStartDateAfter(time){
        if(this.form.endDate != null){
            let edtTime = this.form.endDate.replace(/-/g, '/')
            return time.getTime() > new Date(edtTime) || time.getTime() < Date.now() - 8.64e7;
        }else{
            return time.getTime() < Date.now() - 8.64e7;
        }
    },
    onEndDateAfter(time){
        if(this.form.startDate != null){
            let startTime = this.form.startDate.replace(/-/g, '/')
            return time.getTime() < new Date(startTime);
        }else{
            return time.getTime() < Date.now() - 8.64e7;
        }
    },
    formatDate(date) {
      if(date != null){
        return utcToLocalDate(date)
      }
    },
    formatDatetime(datetime) {
      return utcToLocal(datetime)
    },
    specFilter_filter(isGift) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[isGift]
    },
    isSpecFilter_filter(isGift) {
      return isGift ? 'YES' : 'NO'
    },
    enabledFilter_filter(isGift) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[isGift]
    },
    isEnabledFilter_filter(isGift) {
      return isGift ? 'YES' : 'NO'
    },
    fetchData() {
      this.listLoading = true
      pageActivity({
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
    onDownload(){
        this.listLoading = true
        if(this.radioCheckList.length == 0){
            Message.error("Please Select A Row First")
            this.listLoading = false
            return
        }
        getActivitySvg(this.radioCheckList.id).then(response => {
            const svgString = response.data
            // create a blob object
            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            // create a download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = this.radioCheckList.name + '.svg';
            link.click();
        })
        this.listLoading = false;
    },
    onAdd() {
        this.title = 'Add Activity'
        this.formAction = 'add'
        this.restForm()
        this.dialogFormVisible = true
    },
    onEdit(id) {
        this.title = 'Edit Activity'
        this.formAction = 'edit'
        this.restForm()
        getActivity(id).then(response => {
            this.form = { ...response.data }
            this.dialogFormVisible = true
        })
    },
    onRemove(id) {
        MessageBox.confirm('You will remove this activity, whether to continue?', 'Info', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            deleteActivity(id).then(this.onReset)
        }).catch(() => {

        })
    },
    onAddSubmit() {
        if (this.formAction === 'add') {
            createActivity({ ...this.form })
            .then(this.closeDalog)
            .then(this.onReset)
            .then(() => Message.success('Create Activity Successed '))
        } else if (this.formAction === 'edit') {
            const { id, ...data } = this.form
            editActivity(id, data)
            .then(this.closeDalog)
            .then(this.onReset)
            .then(() => Message.success('Edit Activity Successed'))
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
            isEnabled: false,
            isSpec: false
        }
    }
  }
  }
  </script>
<style lang='scss'>
.el-input__wrapper {
  width: 345px;
}
</style>
