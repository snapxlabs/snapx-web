<template>
    <el-dialog
        v-model="visible"
        title="Notification"
        width="500px"
        @open="onDialogOpen"
        @close="onDialogClose"
    >
        <el-form
            label-position="top"
            :model="form"
            :rules="rules"
        >
            <el-form-item label="Title">
                <el-input
                    v-model="form.title"
                />
            </el-form-item>
            <el-form-item label="Context">
                <el-input
                    v-model="form.context"
                    type="textarea"
                />
            </el-form-item>
            <el-form-item label="Description">
                <el-input
                    v-model="form.description"
                    type="textarea"
                />
            </el-form-item>
            <el-form-item label="Send To">
                <el-checkbox v-model="form.inSiteMessage" label="In Site Message" size="large" />
                <el-checkbox v-model="form.push" label="App Push" size="large" />
            </el-form-item>
            <el-form-item label="Global">
                <el-space>
                    <el-switch
                        v-model="form.global"
                    />
                    <el-button v-if="!form.global" @click="showMember">Add Member</el-button>
                </el-space>
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
    <Member
        :visible="memberDialog.visible"
        :member-id-list="memberDialog.memberIdList"
        @updated="onUpdate"
    />
</template>

<script setup>
import { $ref, defineProps, defineEmits } from 'vue/macros'
import { ref } from 'vue'
import { createNotification, findNotification, updateNotification } from '@/api/member/notification'
import { ElMessage } from 'element-plus'
import Member from './Member.vue'

const props = defineProps({
  action: ref(''),
  visible: ref(false),
  id: ref(null),
})

const action = $ref(props.action)
const emits = defineEmits(['updated'])

const [memberDialog, showMember] = useMember()

let visible = $ref(props.visible)
let form = $ref({
  'inSiteMessage': true,
  'push': false,
  'global': true
})

function onDialogOpen() {
  cleanForm()
  if (action === 'edit') {
    findNotification(props.id.value).then(response => {
      form = { ...response.data }
      visible = true
      memberDialog.memberIdList.value = form.memberIdList
    })
  }
}

function onDialogClose() {
  cleanForm()
}

function cleanForm() {
  memberDialog.memberIdList.value = []
  form = {
    'inSiteMessage': true,
    'push': false,
    'global': true,
    'memberIdList': memberDialog.memberIdList.value
  }
}

function onAddSubmit() {
  if (action === 'add') {
    createNotification({ ...form })
      .then(closeDalog)
      .then(triggerUpdate)
      .then(() => ElMessage.success('Success create an member'))
  } else if (action === 'edit') {
    const { id, ...data } = form
    updateNotification(id, data)
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

function useMember() {
  let visible = ref(false)
  let memberIdList = ref([])
  return [
    {visible, memberIdList},
    () => {
      visible.value = true
    }
  ]
}

function onUpdate() {
  form.memberIdList = memberDialog.memberIdList.value
}

</script>