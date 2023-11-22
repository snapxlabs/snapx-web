<template>
    <div class="app-container">
        <el-container>
            <el-header style="height: 100px">
                <el-form
                    :inline="true"
                    :model="query"
                >
                    <el-form-item label="Activity Name">
                        <el-input
                            v-model="query.activityName"
                            placeholder="filter by activity name"
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
                        width="95"
                    >
                        <template #default="scope">
                            {{ scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Activity Name"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.activityName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Member Account"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.memberAccount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Gift Point"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.giftPointsCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Gift Usdc"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.giftUsdcCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Special Gift Point"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.specGiftPointsCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Special Gift Usdc"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.specGiftUsdcCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Extra Gift Usdc"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.specGiftExtraUsdcCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Total Gift Point"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.totalGiftPointsCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Total Gift Usdc"
                        align="center"
                    >
                        <template #default="scope">
                            <span>{{ scope.row.totalGiftUsdcCount }}</span>
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
  import { Search as ElIconSearch, RefreshLeft as ElIconRefreshLeft} from '@element-plus/icons'
  import { pageActivityMember} from '@/api/activity/activity-member'
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
      pageActivityMember({
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

