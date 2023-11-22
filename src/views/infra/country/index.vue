<template>
    <div class="app-container">
        <el-container>
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
                        :align="center"
                        width="300"
                        label="longName"
                    >
                        <template #default="scope">
                            {{ scope.row.longName }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        width="300"
                        label="shortName"
                    >
                        <template #default="scope">
                            {{ scope.row.shortName }}
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--    label="Operation"-->
                    <!--    width="250"-->
                    <!--    :align="center"-->
                    <!--&gt;-->
                    <!--    <template #default="scope">-->
                    <!--        <el-button-->
                    <!--            type="danger"-->
                    <!--            size="mini"-->
                    <!--            :icon="ElIconDelete"-->
                    <!--            @click="onRemove(scope.row.id)"-->
                    <!--        >Remove-->
                    <!--        </el-button>-->
                    <!--    </template>-->
                    <!--</el-table-column>-->
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="js">
import {
  Search as ElIconSearch,
  RefreshLeft as ElIconRefreshLeft,
  Edit as ElIconEdit,
  Delete as ElIconDelete
} from '@element-plus/icons'
import { listCountries } from '@/api/infra/country'
import {utcToLocal, localToUtc} from '@/utils'

export default {
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
      ElIconSearch, ElIconRefreshLeft, ElIconEdit, ElIconDelete
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
    this.reloadTable()
  },
  methods: {
    formatDatetime(datetime) {
      return utcToLocal(datetime)
    },
    reloadTable() {
      this.table.loading = true
      listCountries().then(response => {
        this.table.dataList = response.data
        this.table.loading = false
      })
    },
  }
}
</script>
