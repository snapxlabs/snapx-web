<template>
    <el-dialog
        v-model="visible"
        title="Member"
        width="500px"
        @open="onDialogOpen"
        @close="onDialogClose"
    >
        <el-form
            label-position="top"
            :model="form"
            :rules="rules"
        >
            <el-form-item label="Virtual User">
                <el-switch v-model="form.virtualUser" />
            </el-form-item>
            <el-form-item
                label="Account"
                prop="account"
            >
                <el-input
                    v-model="form.account"
                    :disabled="formAction == 'edit'"
                />
            </el-form-item>
            <el-form-item
                label="Nickname"
                prop="nickname"
            >
                <el-input
                    v-model="form.nickname"
                    :disabled="formAction == 'edit'"
                />
            </el-form-item>
            <el-form-item
                label="Phone Area Code"
                prop="phoneAreaCode"
            >
                <el-input
                    v-model="form.phoneAreaCode"
                />
            </el-form-item>
            <el-form-item
                label="Phone"
                prop="phone"
            >
                <el-input
                    v-model="form.phone"
                />
            </el-form-item>
            <el-form-item label="Identity">
                <el-radio-group v-model="form.identity">
                    <el-radio label="GENERAL" size="large">General</el-radio>
                    <el-radio label="AGENT" size="large">Agent</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Level">
                <el-input-number v-model="form.level" :min="0" />
            </el-form-item>
            <el-form-item label="Wallets">
                <el-input
                    v-model="form.wallets"
                />
            </el-form-item>
            <div v-if="formAction === 'edit'">
                <el-form-item label="Freeze">
                    <el-switch v-model="form.freeze" />
                </el-form-item>
                <el-form-item label="Freeze Reason">
                    <el-input
                        v-model="form.freezeReason"
                        :disabled="form.freeze === false"
                        type="textarea"
                    />
                </el-form-item>
            </div>
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
import { createMember, updateMember, findMember } from '@/api/member/member'
import { ElMessage } from 'element-plus'

const props = defineProps({
  action: ref(''),
  visible: ref(false),
  id: ref(null),
})

const action = $ref(props.action)
const emits = defineEmits(['updated'])

let visible = $ref(props.visible)
let form = $ref({
  level: 0,
  identity: 'GENERAL',
  freeze: false,
  virtualUser: true
})

function onDialogOpen() {
  cleanForm()
  if (action === 'edit') {
    findMember(props.id.value).then(response => {
      form = { ...response.data }
      visible = true
    })
  }
}

function onDialogClose() {
  cleanForm()
}

function cleanForm() {
  form = {
    level: 0,
    identity: 'GENERAL',
    freeze: false,
    virtualUser: true
  }
}

function onAddSubmit() {
  if (action === 'add') {
    createMember({ ...form })
      .then(closeDalog)
      .then(triggerUpdate)
      .then(() => ElMessage.success('Success create an member'))
  } else if (action === 'edit') {
    const { id, ...data } = form
    updateMember(id, data)
      .then(closeDalog)
      .then(triggerUpdate)
      .then(() => ElMessage.success('Success update an member'))
  } else {
    visible = false
    triggerUpdate()
  }
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