<template>
    <el-dialog
        v-model="visible"
        :title="props.title"
        width="500px"
        @open="onDialogOpen"
        @close="onDialogClose"
    >
        <el-form
            ref="ruleFormRef"
            :model="form"
            :rules="rules"
            label-width="100px" 
            label-position="top"
        >
            <el-form-item label="Title" prop="title">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="Summary" prop="summary">
                <el-input v-model="form.summary" />
            </el-form-item>
            <el-form-item label="Content" prop="content">
                <el-input
                    v-model="form.content"
                    type="textarea" 
                    rows="15"
                />
            </el-form-item>
            <el-form-item label="Publish">
                <el-switch v-model="form.publish" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="onCancel">Cancel</el-button>
                <el-button
                    type="primary"
                    @click="onSubmit(ruleFormRef)"
                >Submit</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { $ref, defineProps, defineEmits } from 'vue/macros'
import { ref, reactive } from 'vue'
import {
  createContentInformation,
  updateContentInformation,
  findContentInformation,
} from '@/api/system/content-information'
import { ElMessage } from 'element-plus'

const props = defineProps({
  action: ref(''),
  title: ref(''),
  visible: ref(false),
  id: ref(null),
})

const emits = defineEmits(['updated'])

const action = $ref(props.action)
let visible = $ref(props.visible)
let form = $ref({})

const ruleFormRef = ref()
const rules = reactive({
  title: [
    { required: true, message: 'Please input title', trigger: 'blur' },
  ],
  summary: [
    { required: true, message: 'Please input summary', trigger: 'blur' },
  ],
  content: [
    { required: true, message: 'Please input content', trigger: 'blur' },
  ],
})

function onDialogOpen() {
  cleanForm()
  if (action === 'edit') {
    findContentInformation(props.id.value).then(fillForm)
  }
}

function onDialogClose() {
  cleanForm()
}

function cleanForm() {
  form = {
    informationType: 'NOTICE',
    publish: false,
  }
}

function fillForm(response) {
  form = {
    ...form,
    ...response.data,
  }
}

function onSubmit(formEl) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (action === 'add') {
        createContentInformation({ ...form })
          .then(closeDalog)
          .then(showSuccessMessage)
          .then(triggerUpdate)
      } else if (action === 'edit') {
        const { id, ...data } = form
        updateContentInformation(id, data)
          .then(closeDalog)
          .then(showSuccessMessage)
          .then(triggerUpdate)
      } else {
        closeDalog()
      }
    } else {
      ElMessage.error(`Require info not provide`)
    }
  })
}

function onCancel() {
  closeDalog()
}

function closeDalog() {
  visible = false
}

function showSuccessMessage() {
  ElMessage.success(`Success ${action} a Notic`)
}

function triggerUpdate() {
  emits('updated')
}
</script>
