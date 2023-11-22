<template>
  <div class="app-container">
    <el-container>
      <el-header style="height: 120px">
        <el-form
          :inline="true"
          :model="filter.condition"
          label-position="right"
        >
          <el-form-item label="ID">
            <el-input
              v-model="filter.condition.id"
              placeholder="filter by id"
            />
          </el-form-item>
          <el-form-item label="Locality">
            <MultilevelLocalityView
              :country-id="filter.condition.countryId"
              :locality-id="filter.condition.localityId"
              :change="handleLocalityChange"
            />
          </el-form-item>
          <el-form-item label="Restaurant name">
            <el-input
              v-model="filter.condition.restaurantName"
              placeholder="filter by Restaurant name"
            />
          </el-form-item>
          <el-form-item label="Rate">
            <el-slider v-model="filter.condition.rate" range show-stops :max="5" style="width: 150px;"/>
          </el-form-item>
          <el-form-item label="Content">
            <el-input
              v-model="filter.condition.content"
              placeholder="filter by Content"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :icon="ElIconSearch"
              @click="onSearch"
            >Serach
            </el-button>
            <el-button
              :icon="ElIconRefreshLeft"
              @click="onReset"
            >Reset
            </el-button>
          </el-form-item>
        </el-form>

        <el-row>
          <el-button
            type="primary"
            :icon="ElIconPlus"
            @click="onAddShow"
          >Add
          </el-button>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          v-loading="table.loading"
          :data="table.dataList"
          element-loading-text="Loading"
          border
          highlight-current-row
        >
          <el-table-column
            :align="center"
            type="index"
            label="#"
            fixed
          >
            <template #default="scope">
              {{ (pager.page - 1) * pager.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            :align="center"
            label="ID"
          >
            <template #default="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column
            :align="center"
            label="Country"
            width="200"
          >
            <template #default="scope">
              {{ scope.row.country.longName }}
            </template>
          </el-table-column>
          <el-table-column
            :align="center"
            label="Locality"
            width="200"
          >
            <template #default="scope">
              {{ scope.row.locality.longName }}
            </template>
          </el-table-column>
          <el-table-column
            :align="center"
            label="Restaurant Name"
            width="300"
          >
            <template #default="scope">
              <router-link v-if="scope.row.restaurant" :to="{path:'/restaurant/restaurant', query: {id: scope.row.restaurant.id}}">
                <el-button size="small">{{ scope.row.restaurant.name }}</el-button>
              </router-link>
              <el-text v-else type="danger">Not exists</el-text>
            </template>
          </el-table-column>
          <el-table-column
            :align="center"
            label="Member Nickname"
            width="180"
          >
            <template #default="scope">
              {{ scope.row.member && scope.row.member.nickname }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Rate"
            width="60"
          >
            <template #default="scope">
              {{ scope.row.rate }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Spent"
            width="100"
          >
            <template #default="scope">
              {{ scope.row.spent }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Currency Code"
            width="100"
          >
            <template #default="scope">
              {{ scope.row.currencyCode }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Earned"
            width="110"
          >
            <template #default="scope">
              <el-button
                text
                type="primary"
                size="mini"
                :icon="ElIconEdit"
                @click="onClickEditEarned(scope.row)"
              >
                {{ scope.row.earned }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            :align="center"
            label="Content"
            width="200"
          >
            <template #default="scope">
              {{ scope.row.content }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Photos"
            min-width="200"
          >
            <template #default="scope">
              <el-carousel height="100px">
                <el-carousel-item v-for="(url, index) in scope.row.photoUrls" :key="url">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="url"
                    :preview-src-list="scope.row.photoUrls"
                    fit="cover"
                    loading="lazy"
                    preview-teleported
                    hide-on-click-modal
                    :initial-index="index"
                    indicator-position="none"
                    direction="vertical"
                  />
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Likes"
            width="100"
          >
            <template #default="scope">
              {{ scope.row.likesNum }}
            </template>
          </el-table-column>
          <el-table-column
            :align="center"
            label="Create Time"
            width="160"
          >
            <template #default="scope">
              {{ formatDatetime(scope.row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column
            :align="center"
            label="Update Time"
            width="160"
          >
            <template #default="scope">
              {{ formatDatetime(scope.row.updateTime) }}
            </template>
          </el-table-column>
          <!--<el-table-column-->
          <!--    :align="center"-->
          <!--    width="180"-->
          <!--    label="update_by"-->
          <!--&gt;-->
          <!--    <template #default="scope">-->
          <!--        {{ scope.row.updateBy }}-->
          <!--    </template>-->
          <!--</el-table-column>-->

          <el-table-column
            label="Operation"
            min-width="150"
            align="center"
            fixed="right"
          >
            <template #default="scope">
              <el-button-group>
                <el-button
                  size="small"
                  :icon="ELIconMore"
                  @click="onCommentsDetail(scope.row.id)"
                />
                <el-button
                  type="primary"
                  size="small"
                  :icon="ElIconEdit"
                  @click="onEdit(scope.row)"
                />
                <el-button
                  type="danger"
                  size="small"
                  :icon="ElIconDelete"
                  @click="onRemove(scope.row.id)"
                />
              </el-button-group>
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


    <el-dialog
      v-model="modals.editEarned.view.dialogVisible"
      title="Edit Earned"
      :width="modals.editEarned.view.dialogWidth"
    >
      <el-form
        :model="modals.editEarned.view.form"
        label-width="100px"
      >
        <el-form-item
          label="Review ID"
          prop="Review ID"
        >
          <el-input
            v-model="modals.editEarned.row.id"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="Curr Earned">
          <el-input v-model="modals.editEarned.row.earned" :disabled="true"/>
        </el-form-item>
        <el-form-item label="New Earned">
          <el-input v-model="modals.editEarned.newRow.earned" type="number"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="modals.editEarned.view.dialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="onClickSubmitEarned"
          >Submit
          </el-button>
        </div>
      </template>
    </el-dialog>

    <add
      ref="addRef"
      v-model="addVisible"
      @close="onAddClose"
    />

    <edit
      :id="editRow.id"
      ref="editRef"
      v-model="editVisible"
      :data="editRow"
      @close="onEditClose"
    />

    <el-dialog
      v-model="modals.commentsDetai.view.dialogVisible"
      title="REVIEW COMMENTS DETAIL"
      :width="modals.commentsDetai.view.dialogWidth"
      :height="modals.commentsDetai.view.dialogHeight"
    >
      <div class="el-dialog-div">
        <el-container>
          <el-header style="height: 100px">
            <el-form
                :inline="true"
                :model="modals.commentsDetai.query"
            >
                <el-form-item label="Member Name">
                    <el-input
                        v-model="modals.commentsDetai.query.fromMemberName"
                        placeholder="filter by member name"
                    />
                </el-form-item>
                <el-form-item label="Member Account">
                    <el-input
                        v-model="modals.commentsDetai.query.fromMemberAccount"
                        placeholder="filter by member account"
                    />
                </el-form-item>
                <el-form-item label="Comment Content">
                    <el-input
                        v-model="modals.commentsDetai.query.content"
                        placeholder="filter by comment content"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        :icon="ElIconSearch"
                        @click="onCommentsDetailSearch"
                    >Serach</el-button>
                    <el-button
                        :icon="ElIconRefreshLeft"
                        @click="onCommentsDetailReset"
                    >Reset</el-button>
                </el-form-item>
            </el-form>
          </el-header>
          <el-main>
            <el-table
              v-loading="modals.commentsDetai.listLoading"
              :data="modals.commentsDetai.list"
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
                label="Member Account"
                align="center"
                width="150"
              >
                <template #default="scope">
                  <span>{{ scope.row.fromMemberNickName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="Member Name"
                align="center"
                width="150"
              >
                <template #default="scope">
                  <span>{{ scope.row.fromMemberAccount }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="Comments Content"
                align="center"
              >
                <template #default="scope">
                  <span>{{ scope.row.content }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="createTime"
                label="Create Time"
                width="150"
              >
                <template #default="scope">
                  <el-icon>
                    <Clock/>
                  </el-icon>
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
                  <el-icon>
                    <Clock/>
                  </el-icon>
                  <span>{{ formatDatetime(scope.row.updateTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="Operation"
                min-width="50"
                align="center"
                fixed="right"
              >
                  <template #default="scope">
                      <el-button-group>
                          <el-button
                            type="danger"
                            size="small"
                            :icon="ElIconDelete"
                            @click="onCommentsDetailRemove(scope.row.id)"
                          />
                      </el-button-group>
                  </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer>
            <el-pagination
              align="center"
              :current-page="modals.commentsDetai.page.currPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="modals.commentsDetai.page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              style="padding: 30px 0; text-align: center; justify-content: center"
              :total="modals.commentsDetai.page.totalCount"
              @size-change="onCommentsDetailPageSizeChange"
              @current-change="onCommentsDetailCurrentPageChange"
            />
          </el-footer>
        </el-container>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="js">
import {
  Search as ElIconSearch,
  RefreshLeft as ElIconRefreshLeft,
  Edit as ElIconEdit,
  Delete as ElIconDelete,
  Expand as ELIconMore,
  Comment as ElIconComment,
} from '@element-plus/icons'
import {pageReviews, deleteReview, updateEarned, pageRestaurantCommentes,deleteRestaurantCommentes} from '@/api/restaurant/restaurant-review'
import {utcToLocal, localToUtc} from '@/utils'
import {ElMessageBox, ElMessage} from 'element-plus'
import MultilevelLocalityView from '@/views/components/MultilevelLocalityView.vue'
import add from '@/views/restaurant/review/add.vue'
import edit from '@/views/restaurant/review/edit.vue'

export default {
  components: {
    add,
    edit,
    MultilevelLocalityView,
  },
  data() {
    return {
      statistics: {},
      filter: {
        condition: {},
        createTime: []
      },
      table: {
        loading: true,
        dataList: []
      },
      pager: {
        page: 1,
        pageSize: 10,
        count: 0
      },
      ElIconSearch, ElIconRefreshLeft, ElIconEdit, ElIconDelete, ELIconMore, ElIconComment,

      addVisible: false,

      editVisible: false,
      editRow: {},

      modals: {
        editEarned: {
          row: {},
          newRow: {
            earned: 0,
          },
          view: {
            dialogVisible: false,
            dialogWidth: '500px',
            form: {
              enabled: true
            },
          },
        },
        commentsDetai: {
          reviewId: null,
          query: {},
          list: null,
          listLoading: true,
          page: {
            currPage: 1,
            pageSize: 10,
            totalCount: 0
          },
          view: {
            dialogVisible: false,
            dialogWidth: '1200px',
            dialogHeight: '600px'
          },
        }
      },
    }
  },
  watch: {
    'filter.createTime'(newVal) {
      if (newVal[0]) {
        this.filter.condition.createTimeStart = localToUtc(newVal[0])
      }
      if (newVal[1]) {
        this.filter.condition.createTimeEnd = localToUtc(newVal[1])
      }
    }
  },
  created() {
    this.filter.condition = this.$route.query
    this.reloadTable()
  },
  methods: {
    formatDatetime(datetime) {
      return utcToLocal(datetime)
    },
    reloadTable() {
      this.table.loading = true
      pageReviews({
        page: this.pager.page,
        pageSize: this.pager.pageSize,
        ...this.filter.condition
      }).then(response => {
        this.table.dataList = response.data.data
        this.table.loading = false
        this.pager.page = response.data.currPage
        this.pager.pageSize = response.data.pageSize
        this.pager.count = response.data.totalCount
      })
    },
    onSearch() {
      this.pager.page = 1
      this.pager.pageSize = 10
      this.reloadTable()
    },
    onReset() {
      this.filter.condition = {}
      this.filter.createTime = []
      this.onSearch()
    },
    onPageChange(page) {
      this.pager.page = page
      this.reloadTable()
    },
    onPageSizeChange(pageSize) {
      this.pager.pageSize = pageSize
      this.reloadTable()
    },
    onRemove(id) {
      ElMessageBox.confirm('You will remove this review, whether to continue?', 'Info', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteReview(id).then(this.onSearch)
      })
    },
    onClickPhoto(url) {
      window.open(url)
    },

    onAddShow() {
      this.addVisible = true
    },
    onAddClose(added = false) {
      this.addVisible = false
      if (added == true) {
        this.reloadTable()
      }
    },

    onEdit(row) {
      this.editVisible = true
      this.editRow = row
    },
    onEditClose(edited = false) {
      this.editVisible = false
      this.editRow = {}
      if (edited == true) {
        this.reloadTable()
      }
    },

    closeEditEarnedModal() {
      this.modals.editEarned.view.dialogVisible = false
    },
    onClickEditEarned(row) {
      this.modals.editEarned.row = row
      this.modals.editEarned.newRow.earned = 0
      this.modals.editEarned.view.dialogVisible = true
    },
    onClickSubmitEarned() {
      const id = this.modals.editEarned.row.id
      const earned = this.modals.editEarned.newRow.earned
      updateEarned(id, earned)
        .then(res => {
          if (!res.data) {
            ElMessage.error(res.message)
            return
          }
          ElMessage.success('Success')
          this.closeEditEarnedModal()
          this.reloadTable()
        })
    },
    handleLocalityChange(countryId, localityId) {
      this.filter.condition.countryId = countryId
      this.filter.condition.localityId = localityId
    },
    onCommentsDetail(reviewId) {
      this.modals.commentsDetai.view.dialogVisible = true
      this.modals.commentsDetai.reviewId = reviewId
      this.fetchCommentsDetailData()
    },
    fetchCommentsDetailData() {
      this.modals.commentsDetai.listLoading = true
      this.modals.commentsDetai.query.reviewId = this.modals.commentsDetai.reviewId
      pageRestaurantCommentes({
        page: this.modals.commentsDetai.page.currPage,
        pageSize: this.modals.commentsDetai.page.pageSize,
        ...this.modals.commentsDetai.query
      }).then(response => {
        this.modals.commentsDetai.list = response.data.data
        this.modals.commentsDetai.listLoading = false
        this.modals.commentsDetai.page.currPage = response.data.currPage
        this.modals.commentsDetai.page.pageSize = response.data.pageSize
        this.modals.commentsDetai.page.totalCount = response.data.totalCount
      })
    },
    onCommentsDetailSearch() {
      this.modals.commentsDetai.page.currPage = 1
      this.modals.commentsDetai.page.pageSize = 10
      this.fetchCommentsDetailData()
    },
    onCommentsDetailReset() {
      this.modals.commentsDetai.page.currPage = 1
      this.modals.commentsDetai.page.pageSize = 10
      this.modals.commentsDetai.query = {}
      this.fetchCommentsDetailData()
    },
    onCommentsDetailPageSizeChange(val) {
      this.modals.commentsDetai.page.pageSize = val
      this.fetchCommentsDetailData()
    },
    onCommentsDetailCurrentPageChange(val) {
      this.modals.commentsDetai.page.currPage = val
      this.fetchCommentsDetailData()
    },
    onCommentsDetailRemove(id) {
        ElMessageBox.confirm('You will remove this comment, whether to continue?', 'Warn', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => {
            deleteRestaurantCommentes(id).then(this.onCommentsDetailSearch)
        })
    }
  }
}
</script>
