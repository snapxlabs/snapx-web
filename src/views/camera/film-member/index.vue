<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100px">
                <el-form
                    :inline="true"
                    :model="query"
                >
                    <el-form-item label="Member Name">
                        <el-input
                            v-model="query.memberNickName"
                            placeholder="filter by member name"
                        />
                    </el-form-item>
                    <el-form-item label="Member Account">
                        <el-input
                            v-model="query.memberAccount"
                            placeholder="filter by member account"
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
                    label="Member Name"
                    align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.memberNickName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Member Account"
                    >
                        <template #default="scope">
                            {{ scope.row.memberAccount }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Remaining Quantity"
                    >
                        <template #default="scope">
                            {{ scope.row.remainingQuantity }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Total Quantity"
                    >
                        <template #default="scope">
                            {{ scope.row.totalQuantity }}
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
                      width="350"
                      align="center"
                    >
                      <template #default="scope">
                            <el-button
                                type="danger"
                                size="mini"
                                :icon="ElIconEdit"
                                @click="onAdjust(scope.row.memberId)"
                            >Adjust Quantity</el-button>
                          <el-button
                              type="primary"
                              size="mini"
                              :icon="ELIconMore"
                              @click="onDetail(scope.row.memberId)"
                          >Detail</el-button>
                          
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
        title="FILE MEMBER DETAIL"
        width="1200px"
        height="500px"
        >
        <div class="el-dialog-div">
            <el-container>
                <el-main>
                    <el-table
                        v-loading="detailListLoading"
                        :data="detailList"
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
                            label="Film Change Type"
                            align="center"
                        >
                            <template #default="scope">
                                <span>{{ scope.row.filmChangeType }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="Variable Quantity"
                        >
                            <template #default="scope">
                                {{ scope.row.variableQuantity }}
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
                    </el-table>
                </el-main>
                <el-footer>
                    <el-pagination
                        align="center"
                        :current-page="detailCurrPage"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="detailPageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        style="padding: 30px 0; text-align: center; justify-content: center"
                        :total="detailTotalCount"
                        @size-change="onDetailPageSizeChange"
                        @current-change="onDetailCurrentPageChange"
                    />
                </el-footer>
            </el-container>
        </div>
    </el-dialog>
    <el-dialog
    v-model="dialogAdjustFormVisible"
    title="Adjust Member Films Quantity"
    width="500px"
    >
        <el-form
        :model="adjustForm"
        :rules="rules"
        >
            <el-form-item label="Adjust quantity"  prop="adjustQuantity">
                <el-input v-model="adjustForm.adjustQuantity" oninput="value=value.replace(/^([0-9-]\d*\.?\d{0,2})?.*$/,'$1')"/>
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
  import { Search as ElIconSearch, RefreshLeft as ElIconRefreshLeft, Plus as ElIconPlus, Edit as ElIconEdit, Delete as ElIconDelete, Expand as ELIconMore } from '@element-plus/icons'
  import { pageFilmMember,pageFileMemberDetail,adjustQuantity} from '@/api/camera/film-member'
  import { ElMessage as Message} from 'element-plus'
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
      memberId: null,
      dialogFormVisible: false,
      detailList: null,
      detailListLoading: true,
      detailCurrPage: 1,
      detailPageSize: 10,
      detailTotalCount: 0,
      detailQuery: {},
      dialogAdjustFormVisible: false,
      adjustForm: {},
      rules: {
        adjustQuantity: [
          { required: true, message: 'please input adjust quantity', trigger: 'blur' }
        ]
      },
      ElIconSearch, ElIconRefreshLeft, ElIconPlus, ElIconEdit, ElIconDelete, ELIconMore
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
      pageFilmMember({
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
    onDetail(memberId){
        this.dialogFormVisible = true
        this.memberId = memberId;
        this.fetchDetailData()
    },
    fetchDetailData() {
      this.detailListLoading = true
      this.query.memberId = this.memberId ;
      pageFileMemberDetail({
        page: this.detailCurrPage,
        pageSize: this.detailPageSize,
        ... this.query
      }).then(response => {
        this.detailList = response.data.data
        this.detailListLoading = false
        this.detailCurrPage = response.data.currPage
        this.detailPageSize = response.data.pageSize
        this.detailTotalCount = response.data.totalCount
      })
    },
    onDetailSearch() {
      this.detailCurrPage = 1
      this.detailPageSize = 10
      this.fetchDetailData()
    },
    onDetailReset() {
      this.detailCurrPage = 1
      this.detailPageSize = 10
      this.detailQuery = {}
      this.fetchDetailData()
    },
    onDetailPageSizeChange(val) {
      this.detailPageSize = val
      this.fetchDetailData()
    },
    onDetailCurrentPageChange(val) {
      this.detailCurrPage = val
      this.fetchDetailData()
    },
    onAdjust(memberId) {
      this.adjustForm.memberId = memberId;
      this.dialogAdjustFormVisible = true
    },
    onAddSubmit() {
        adjustQuantity({ ...this.adjustForm })
            .then(this.closeDalog)
            .then(this.onReset)
            .then(() => Message.success('Adjust Member Films Quantity Successed '))
    },
    onAddCancel() {
        this.closeDalog()
    },
    closeDalog() {
        this.dialogAdjustFormVisible = false
    }
  }
  }
  </script>
  <style lang="scss">
  .el-dialog-div {
    height: 60vh;
    overflow-x: hidden;
  }
  </style>