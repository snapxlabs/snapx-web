<template>
    <div class="app-container">
        <el-container>
            <el-header style="min-height: 150px">
                <el-form
                    :inline="true"
                    :model="filter.condition"
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
                    <el-form-item label="Name">
                        <el-input
                            v-model="filter.condition.name"
                            placeholder="filter by name"
                        />
                    </el-form-item>
                    <el-form-item label="From Google">
                        <el-select
                            v-model="filter.condition.google"
                            placeholder="filter by google"
                            clearable
                        >
                            <el-option
                                label="true"
                                value="true"
                            />
                            <el-option
                                label="false"
                                value="false"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Spec">
                        <el-select
                            v-model="filter.condition.spec"
                            placeholder="filter by spec"
                            clearable
                        >
                            <el-option
                                label="true"
                                value="true"
                            />
                            <el-option
                                label="false"
                                value="false"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Verified">
                        <el-select
                            v-model="filter.condition.verified"
                            placeholder="filter by verified"
                            clearable
                        >
                            <el-option
                                label="true"
                                value="true"
                            />
                            <el-option
                                label="false"
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
                        width="200"
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
                            {{ scope.row.country && scope.row.country.longName }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Locality"
                        width="200"
                    >
                        <template #default="scope">
                            {{ scope.row.locality && scope.row.locality.longName }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        width="300"
                        label="Name"
                    >
                        <template #default="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="130"
                        label="Cover"
                    >
                        <template #default="scope">
                            <!--<el-image-->
                            <!--    v-if="scope.row.coverUrl"-->
                            <!--    style="width: 100px;"-->
                            <!--    :src="scope.row.coverUrl"-->
                            <!--    fit="contain"-->
                            <!--/>-->
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="scope.row.coverUrl"
                                :preview-src-list="scope.row.coverUrl && [scope.row.coverUrl]"
                                fit="scale-down"
                                loading="lazy"
                                preview-teleported
                                hide-on-click-modal
                                indicator-position="none"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Avg Earned"
                        width="110"
                    >
                        <template #default="scope">
                            {{ scope.row.avgEarned }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Avg Rating"
                        width="100"
                    >
                        <template #default="scope">
                            {{ scope.row.avgRating }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Rating1 Num"
                    >
                        <template #default="scope">
                            {{ scope.row.rating1Num }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Rating2 Num"
                    >
                        <template #default="scope">
                            {{ scope.row.rating2Num }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Rating3 Num"
                    >
                        <template #default="scope">
                            {{ scope.row.rating3Num }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Rating4 Num"
                    >
                        <template #default="scope">
                            {{ scope.row.rating4Num }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Rating5 Num"
                    >
                        <template #default="scope">
                            {{ scope.row.rating5Num }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Place ID"
                        width="250"
                    >
                        <template #default="scope">
                            {{ scope.row.placeId }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Lng/Lat"
                        min-width="130"
                    >
                        <template #default="scope">
                            <el-link type="primary" @click="onClickLngOrLat(scope.row)">
                                {{ scope.row.lng }}
                                <br />
                                {{ scope.row.lat }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Review Num"
                    >
                        <template #default="scope">
                            {{ scope.row.reviewNum }}
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        label="Views"
                    >
                        <template #default="scope">
                            {{ scope.row.views }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="From Google"
                    >
                        <template #default="scope">
                            <el-tag
                                :type="scope.row.google ? 'primary' : 'info'"
                                effect="dark"
                            >
                                {{ scope.row.google }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="Spec"
                    >
                        <template #default="scope">
                            <el-switch v-model="scope.row.spec" @change="onSpecChange(scope.row)" />
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        label="Verified"
                    >
                        <template #default="scope">
                            <el-switch v-model="scope.row.verified" @change="onVerifiedChange(scope.row)" />
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        label="Creator"
                        min-width="100"
                    >
                        <template #default="scope">
                            {{ scope.row.creator && scope.row.creator.nickname }}
                        </template>
                    </el-table-column>

                    <el-table-column
                        :align="center"
                        width="160"
                        label="Create Time"
                    >
                        <template #default="scope">
                            {{ formatDatetime(scope.row.createTime) }}
                        </template>
                    </el-table-column>

                    <el-table-column
                        :align="center"
                        width="160"
                        label="Update time"
                    >
                        <template #default="scope">
                          {{ formatDatetime(scope.row.updateTime) }}
                        </template>
                    </el-table-column>

                    <!--<el-table-column-->
                    <!--    :align="center"-->
                    <!--    width="180"-->
                    <!--    label="create_by"-->
                    <!--&gt;-->
                    <!--    <template #default="scope">-->
                    <!--        {{ scope.row.createBy }}-->
                    <!--    </template>-->
                    <!--</el-table-column>-->

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
                                    :icon="ElIconComment"
                                    @click="onReview(scope.row)"
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

        <!--<el-dialog-->
        <!--    v-model="modals.add.view.dialogVisible"-->
        <!--    title="Add"-->
        <!--    width="800"-->
        <!--&gt;-->
        <!--    <template #footer>-->
        <!--        <view class="dialog-footer">-->
        <!--            <el-button @click="modals.add.view.dialogVisible = false">Cancel</el-button>-->
        <!--            <el-button-->
        <!--                type="primary"-->
        <!--                @click="onAddSubmit"-->
        <!--            >Submit-->
        <!--            </el-button>-->
        <!--        </view>-->
        <!--    </template>-->
        <!--</el-dialog>-->

    </div>
</template>

<script lang="js">
import add from '@/views/restaurant/restaurant/add.vue'
import edit from '@/views/restaurant/restaurant/edit.vue'


import {
  Plus as ElIconPlus,
  Search as ElIconSearch,
  RefreshLeft as ElIconRefreshLeft,
  Edit as ElIconEdit,
  Delete as ElIconDelete,
  Comment as ElIconComment,
} from '@element-plus/icons'
import {deleteRestaurant, pageRestaurants, setSpec, setVerified} from '@/api/restaurant/restaurant'
import {utcToLocal, localToUtc} from '@/utils'
import {ElMessage, ElMessageBox} from 'element-plus'
import MultilevelLocalityView from '@/views/components/MultilevelLocalityView.vue'

export default {
  components: {
    add,
    edit,
    MultilevelLocalityView
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

      addVisible: false,
      editVisible: false,
      editRow: {},


      ElIconPlus, ElIconSearch, ElIconRefreshLeft, ElIconEdit, ElIconDelete, ElIconComment
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
    },

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
      pageRestaurants({
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
      ElMessageBox.confirm('You will remove this restaurant, whether to continue?', 'Info', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteRestaurant(id).then(this.onSearch)
      })
    },
    onSpecChange(row) {
      const id = row.id
      const spec = row.spec
      setSpec(id, spec)
        .then(res => {
          if (!res.data) {
            ElMessage.error(res.message)
            row.spec = !row.spec
            return
          }
          ElMessage.success('Success')
        })
    },

    onVerifiedChange(row) {
      const id = row.id
      const verified = row.verified
      setVerified(id, verified)
        .then(res => {
          if (!res.data) {
            ElMessage.error(res.message)
            row.verified = !row.verified
            return
          }
          ElMessage.success('Success')
        })
    },

    onReview(row) {
      this.$router.push({path: '/restaurant/review', query: {restaurantName: row.name}})
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

    handleLocalityChange(countryId, localityId) {
      this.filter.condition.countryId = countryId
      this.filter.condition.localityId = localityId
    },

    onClickLngOrLat(row) {
      let url = `https://www.google.com/maps/search/?api=1&query=${row.lat},${row.lng}`
      window.open(url)
    },
  }
}
</script>
