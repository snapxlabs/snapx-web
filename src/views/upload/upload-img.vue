<template>
    <div>
        <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="handleBeforeUpload"
            :http-request="handleUpload"
        >
            <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
            />
            <el-icon v-else  class="avatar-uploader-icon"><el-icon-plus /></el-icon>
        </el-upload>
    </div>
</template>

<script>
import { Plus as ElIconPlus } from '@element-plus/icons'
import request from '@/utils/request'

export default {
  components: {
    ElIconPlus,
  },
  data() {
    return {
      imageUrl: '',
    }
  },
  methods: {
    handleUpload(file) {
      const param = new FormData()
      param.append('file', file.file)
      request({
        url: '/infra/resource-file/create-resource-file',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: param,
      })
        .then((res) => {
          this.imageUrl = res.data.fileUrl
        })
        .catch()
    },
    handleUploadSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleBeforeUpload(file) {
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isPNG && isLt2M
    },
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
