<template>
    <el-dialog
        v-model="visible"
        title="Add Detail"
        width="500px"
        @open="onDialogOpen"
        @close="onDialogClose"
    >
        <el-form
            label-position="top"
            :model="form"
            :rules="rules"
        >
            <el-form-item label="Increase Or Reduce Amount">
                <el-input
                    v-model="form.amount"
                />
            </el-form-item>
            <el-form-item
                label="Reason"
            >
                <el-input
                    v-model="form.reason"
                    type="textarea"
                />
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
</template>

<script setup>
import { $ref, defineProps, defineEmits } from 'vue/macros'
import { ref } from 'vue'
import { updateAccounts } from '@/api/trade/usdc-accounts'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: ref(false),
  id: ref(null),
})

const emits = defineEmits(['updated'])

let visible = $ref(props.visible)
let form = $ref({
  'memberId': props.id.value
})

function onDialogOpen() {
  cleanForm()
}

function onDialogClose() {
  cleanForm()
}

function cleanForm() {
  form = {
    'memberId': props.id.value
  }
}

function onAddSubmit() {
  updateAccounts({ ...form })
    .then(closeDalog)
    .then(triggerUpdate)
    .then(() => ElMessage.success('Success Add Detail'))
}

function onAddCancel() {
  closeDalog()
}

function closeDalog() {
  visible = false
}

function triggerUpdate() {
  emits('updated')
}

</script>