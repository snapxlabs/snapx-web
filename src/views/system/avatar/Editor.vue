<template>
    <el-dialog
        v-model="visible"
        :title="props.title"
        width="500px"
        @open="onDialogOpen"
        @close="onDialogClose"
    >
        <el-result title="Avatar">
            <template #icon>
                <el-space direction="vertical" size="large">
                    <el-upload
                        class="cover-uploader"
                        action="/admin/infra/resource-file/create-resource-file"
                        :show-file-list="false"
                        :on-success="handleCoverSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="coverUpload" :src="coverUpload" class="cover" />
                        <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                    <el-upload
                        class="avatar-uploader"
                        action="/admin/infra/resource-file/create-resource-file"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="avatarUpload" :src="avatarUpload" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-space>
            </template>
            <template #extra>
                <el-button @click="onCancel">Cancel</el-button>
                <el-button type="primary" @click="onSubmit">Submit</el-button>
            </template>
        </el-result>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { $ref, defineProps, defineEmits } from 'vue/macros'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import './Editor.vue'
import { createMemberAvatar, updateMemberAvatar } from '@/api/system/member-avatar'

const props = defineProps({
  action: ref(''),
  title: ref(''),
  visible: ref(false),
  data: ref({}),
})

const emits = defineEmits(['updated'])

const action = $ref(props.action)
let visible = $ref(props.visible)

let avatarUpload = $ref()
let coverUpload = $ref()
let data = $ref({})

const onDialogOpen = () => {
  cleanForm()
  if (action === 'edit') {
    data = { ... props.data.value }
    avatarUpload = data.avatarUrl
    coverUpload = data.avatarCoverUrl
  }
}

const onDialogClose = () => {
  cleanForm()
}

const cleanForm = () => {
  data = {}
  avatarUpload = ''
  coverUpload = ''
}

const handleAvatarSuccess = response => {
  avatarUpload = response.data.fileUrl
  data.avatarUrl = avatarUpload
}

const handleCoverSuccess = response => {
  coverUpload = response.data.fileUrl
  data.avatarCoverUrl = coverUpload
}

const beforeAvatarUpload = (rawFile) => {
  if (!(rawFile.type === 'image/jpeg' || rawFile.type === 'image/png')) {
    ElMessage.error('Avatar picture must be JPG / PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 500) {
    ElMessage.error('Avatar picture size can not exceed 500MB!')
    return false
  }
  return true
}

const onSubmit = () => {
  if (action === 'add') {
    createMemberAvatar({ ...data })
      .then(closeDalog)
      .then(showSuccessMessage)
      .then(triggerUpdate)
  } else if (action === 'edit') {
    updateMemberAvatar({ ...data })
      .then(closeDalog)
      .then(showSuccessMessage)
      .then(triggerUpdate)
  } else {
    closeDalog()
  }
}

function onCancel() {
  closeDalog()
}

const closeDalog = () => {
  visible = false
}

const showSuccessMessage = () => {
  ElMessage.success(`Success ${action} an Avatar`)
}

function triggerUpdate() {
  emits('updated')
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 50px;
  display: block;
}

.cover-uploader .cover {
  width: 200px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  text-align: center;
}

.cover-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.cover-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 140px;
  text-align: center;
}

</style>