<template>
    <el-dialog
        :title="title"
        :v-model="visible"
        :modal-append-to-body="false"
        :width="width"
        :before-close="handleClose"
    >

        <el-form
            label-width="130px"
        >
            <el-form-item label="Source Locality">
                <MultilevelLocalityView
                    :country-id="sourceCountryId"
                    :locality-id="sourceLocalityId"
                    :change="handleLocalityChange1"
                />
            </el-form-item>

            <el-form-item label="Target Locality">
                <MultilevelLocalityView
                    :country-id="targetCountryId"
                    :locality-id="targetLocalityId"
                    :change="handleLocalityChange2"
                />
            </el-form-item>

        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">Cancel</el-button>
                <el-button
                    type="primary"
                    @click="handleSubmit"
                >Submit
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import {Plus} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import MultilevelLocalityView from '../../components/MultilevelLocalityView.vue'
import {mergeLocalities} from '@/api/infra/locality'

export default {
    name: 'Merge',
    components: {MultilevelLocalityView},
    props: {
        title: {
            type: String,
            default: 'Merge',
        },
        width: {
            type: String,
            default: '400px',
        },
        visible: Boolean,

        sourceCountryId: String,
        sourceLocalityId: String,
        targetCountryId: String,
        targetLocalityId: String,
    },
    data() {
        return {
            sourceId: this.sourceLocalityId,
            targetId: this.targetLocalityId,
            Plus,
        }
    },
    watch: {
        sourceLocalityId(val) {
            this.sourceId = val
        },
        targetLocalityId(val) {
            this.targetId = val
        },
    },
    created() {
        console.log('created')
    },
    methods: {
        handleSubmit() {
            mergeLocalities(this.sourceId, this.targetId).then((res) => {
                if (!res.data) {
                    ElMessage.error(res.message)
                    return
                }
                ElMessage.success('Success')
                this.handleClose(true)
            })
        },

        handleClose(confirmed = false) {
            this.row = {}
            this.$emit('close', confirmed)
        },

        handleLocalityChange1(countryId, localityId) {
            this.sourceId = localityId
        },

        handleLocalityChange2(countryId, localityId) {
            this.targetId = localityId
        },

    },
}
</script>

<style lang="scss">

</style>
