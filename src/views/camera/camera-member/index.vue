<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100px">
                <el-form
                    :inline="true"
                    :model="query"
                >
                    <el-form-item label="Camera Name">
                        <el-input
                            v-model="query.cameraName"
                            placeholder="filter by cameraname"
                        />
                    </el-form-item>
                    <el-form-item label="Camera Code">
                        <el-input
                            v-model="query.cameraCode"
                            placeholder="filter by cameracode"
                        />
                    </el-form-item>
                    <el-form-item label="Member Name">
                        <el-input
                            v-model="query.memberNickName"
                            placeholder="filter by memberaname"
                        />
                    </el-form-item>
                    <el-form-item label="Member Account">
                        <el-input
                            v-model="query.memberAccount"
                            placeholder="filter by memberaccount"
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
                        label="Camera Name"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.cameraName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Camera Code"
                    >
                        <template #default="scope">
                            {{ scope.row.cameraCode }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Camera Source"
                    >
                        <template #default="scope">
                            {{cameraSourceName[scope.row.cameraSource]}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Experience"
                    >
                        <template #default="scope">
                            {{ scope.row.experience }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Level"
                    >
                        <template #default="scope">
                            {{ scope.row.currentLevel }}
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
    </div>
  </template>
  
  <script lang="js">
  import { Search as ElIconSearch, RefreshLeft as ElIconRefreshLeft } from '@element-plus/icons'
  import { pageCameraMember} from '@/api/camera/camera-member'
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
      cameraSourceName:{'REGISTER_GIFT':'REGISTER GIFTED'},
      ElIconSearch, ElIconRefreshLeft
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
      pageCameraMember({
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
    }
  }
  }
  </script>
  