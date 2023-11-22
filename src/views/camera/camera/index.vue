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
                  <el-form-item label="Code">
                      <el-input
                          v-model="query.code"
                          placeholder="filter by code"
                      />
                  </el-form-item>
                  <el-form-item label="Is Register Gift">
                      <el-select
                          v-model="query.isGift"
                          placeholder="filter is register gift"
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
                      align="center"
                      label="No"
                      width="95"
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
                      label="Code"
                  >
                      <template #default="scope">
                          {{ scope.row.code }}
                      </template>
                  </el-table-column>
                  <el-table-column
                        align="center"
                        label="Picture"
                    >
                        <template #default="scope">
                            <el-image v-if="scope.row.pictureUrl" style="width: 50px;" :src="scope.row.pictureUrl" fit="contain" />
                        </template>
                  </el-table-column>
                  <el-table-column
                      label="Instruction"
                      align="center"
                  >
                      <template #default="scope">
                          {{ scope.row.instruction }}
                      </template>
                  </el-table-column>
                  <el-table-column
                      class-name="status-col"
                      label="Is Register Gift"
                      width="130"
                      align="center"
                  >
                      <template #default="scope">
                        <div style="text-align:center">
                          <el-tag  :type="statusFilter_filter(scope.row.isGift)">{{
                              isGiftFilter_filter(scope.row.isGift)
                          }}</el-tag>
                        </div>
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
                      width="200"
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
                <el-form-item label="Camera Name"  prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Camera Code" prop="code">
                    <el-input v-model="form.code" />
                </el-form-item>
                <el-form-item label="Camera Picture">
                    <uploadImg ref="refUploadImg" />
                </el-form-item>
                <el-form-item label="Instruction">
                    <el-input v-model="form.instruction" type="textarea"/>
                </el-form-item>

                <el-form-item label="Is Register Gift">
                    <el-switch v-model="form.isGift"/>
                </el-form-item>
                <el-form-item label="Sort">
                    <el-input v-model="form.sort" />
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
import { pageCamera,createCamera,editCamera,deleteCamera,getCamera} from '@/api/camera/camera'
import { ElMessage as Message, ElMessageBox as MessageBox } from 'element-plus'
import { utcToLocal } from '@/utils'
import uploadImg from '@/views/upload/upload-img.vue'

export default {
components:{
    'uploadImg':uploadImg
},
data() {
  return {
    list: null,
    listLoading: true,
    currPage: 1,
    pageSize: 10,
    totalCount: 0,
    query: {},
    title:'',
    formLabelWidth: '500px',
    dialogFormVisible: false,
    form: {
        isGift: false
    },
    formAction: null,
    rules: {
        name: [
          { required: true, message: 'please input cameraname', trigger: 'blur' },
          { min: 1, max: 32, message: 'cameraname length must between 3 and 32', trigger: 'blur' }
        ],
        code: [
          { required: true, message: 'please input cameracode', trigger: 'blur' },
          { min: 1, max: 32, message: 'cameracode length must between 3 and 32', trigger: 'blur' }
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
  statusFilter_filter(isGift) {
    const statusMap = {
      true: 'success',
      false: 'danger'
    }
    return statusMap[isGift]
  },
  isGiftFilter_filter(isGift) {
    return isGift ? 'YES' : 'NO'
  },
  fetchData() {
    this.listLoading = true
    pageCamera({
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
    this.title = 'Add Crmera'
    this.formAction = 'add'
    this.restForm()
    this.$nextTick(function() { this.$refs.refUploadImg.imageUrl = '' })
    this.dialogFormVisible = true
  },
  onEdit(id) {
    this.title = 'Edit Crmera'
    this.formAction = 'edit'
    this.restForm()
    getCamera(id).then(response => {
        this.form = { ...response.data }
        this.dialogFormVisible = true
        this.$nextTick(function() { this.$refs.refUploadImg.imageUrl = response.data.pictureUrl })
    })
  },
  onRemove(id) {
    MessageBox.confirm('You will remove this camera, whether to continue?', 'Info', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
    }).then(() => {
        deleteCamera(id).then(this.onReset)
    }).catch(() => {

    })
  },
  onAddSubmit() {
    if (this.formAction === 'add') {
        this.form.pictureUrl = this.$refs.refUploadImg.imageUrl
        createCamera({ ...this.form })
        .then(this.closeDalog)
        .then(this.onReset)
        .then(() => Message.success('Create Camera Successed '))
    } else if (this.formAction === 'edit') {
        this.form.pictureUrl = this.$refs.refUploadImg.imageUrl
        const { id, ...data } = this.form
        editCamera(id, data)
        .then(this.closeDalog)
        .then(this.onReset)
        .then(() => Message.success('Edit Camera Successed'))
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
      isGift: false
    }
  }
}
}
</script>
<style lang='scss'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>