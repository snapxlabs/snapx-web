<template>
    <div class="app-container">
        <el-container>
            <el-header>
                <el-row>
                    <el-button
                        type="primary"
                        size="small"
                        @click="onMergeShow"
                        v-if="rowList.length == 2"
                    >Merge
                    </el-button>
                </el-row>
            </el-header>
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
                        label=""
                        width="40"
                    >
                        <template #default="scope">
                            <!--<el-checkbox v-model="checked[scope.row.id]" label="" size="large" />-->
                            <el-checkbox v-model="checked[scope.row.id]" size="large"
                                         @change="handleChecked(scope.row, checked[scope.row.id])"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        type="index"
                        label="#"
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

        <merge
            ref="mergeRef"
            v-model="mergeVisible"
            @close="onMergeClose"
            :source-country-id="sourceCountryId"
            :source-locality-id="sourceLocalityId"
            :target-country-id="targetCountryId"
            :target-locality-id="targetLocalityId"
        />
    </div>
</template>

<script lang="js">
import {
    Search as ElIconSearch,
    RefreshLeft as ElIconRefreshLeft,
    Plus as ElIconPlus,
    Edit as ElIconEdit,
    Delete as ElIconDelete
} from '@element-plus/icons'
import {utcToLocal, localToUtc} from '@/utils'
import {listLocalities} from '@/api/infra/locality'
import Merge from '@/views/infra/locality/merge.vue'

export default {
    components: {Merge},
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

            checked: {},
            mergeVisible: false,

            rowList: [],

            sourceCountryId: 0,
            sourceLocalityId: 0,
            targetCountryId: 0,
            targetLocalityId: 0,

            ElIconPlus, ElIconSearch, ElIconRefreshLeft, ElIconEdit, ElIconDelete,
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
        this.reloadTable()
    },
    methods: {
        formatDatetime(datetime) {
            return utcToLocal(datetime)
        },
        reloadTable() {
            this.table.loading = true
            listLocalities().then(response => {
                this.table.dataList = response.data
                this.table.loading = false
            })
        },
        onMergeShow() {
            this.mergeVisible = true
        },
        onMergeClose(confirmed = false) {
            this.mergeVisible = false
            if (confirmed == true) {
                this.reloadTable()
            }
        },

        handleChecked(row, checked) {
            if (checked) {
                this.rowList.push(row)
            } else {
                for (let i = this.rowList.length - 1; i >= 0; i--) {
                    let item = this.rowList[i]
                    if (item.id === row.id) {
                        this.rowList.splice(i, 1)
                    }
                }
            }

            if (this.rowList.length == 1) {
                this.sourceCountryId = this.rowList[0].country.id
                this.sourceLocalityId = this.rowList[0].id
            }
            if (this.rowList.length >= 2) {
                this.targetCountryId = this.rowList[this.rowList.length - 1].country.id
                this.targetLocalityId = this.rowList[this.rowList.length - 1].id
            }
        },
    }
}
</script>
