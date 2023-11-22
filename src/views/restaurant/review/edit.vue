<template>
    <el-dialog
        :title="title"
        :v-model="visible"
        :modal-append-to-body="false"
        :width="width"
        :height="height"
        :before-close="handleClose"
    >

        <el-form
            label-position="left"
            label-width="120px"
        >
            <el-tabs v-model="activeName" tab-position="left" class="review-edit-tabs" @tab-click="handleClick">
                <el-tab-pane label="Basic" name="basic">

                    <el-form-item label="ID">
                        <el-text>{{ row.id }}</el-text>
                    </el-form-item>

                    <el-form-item label="Locality">
                        <MultilevelLocalityView
                            :country-id="row.countryId"
                            :locality-id="row.localityId"
                            :change="handleLocalityChange"
                        />
                    </el-form-item>

                    <el-form-item label="Restaurant name">
                        <el-text>{{ row.restaurant && row.restaurant.name }}</el-text>
                    </el-form-item>

                    <el-form-item label="Create time">
                        <el-text>{{ row.createTime }}</el-text>
                    </el-form-item>

                    <el-form-item label="Update time">
                        <el-text>{{ row.updateTime }}</el-text>
                    </el-form-item>

                    <!--<el-form-item label="name">-->
                    <!--  <el-input v-model="row.name" type="text"/>-->
                    <!--</el-form-item>-->

                    <!--<el-form-item label="Cover">-->
                    <!--  <el-input v-model="row.coverUrl" type="hidden" readonly/>-->
                    <!--  <el-upload-->
                    <!--    class="uploader"-->
                    <!--    action="/admin/infra/resource-file/create-resource-file"-->
                    <!--    :show-file-list="false"-->
                    <!--    :on-success="handleUploadSuccess"-->
                    <!--    :before-upload="beforeUpload"-->
                    <!--  >-->
                    <!--    <img v-if="row.coverUrl" :src="row.coverUrl" class="image"/>-->
                    <!--    <el-icon v-else class="el-icon-plus uploader-icon">-->
                    <!--      <el-icon-plus/>-->
                    <!--    </el-icon>-->
                    <!--  </el-upload>-->
                    <!--</el-form-item>-->

                </el-tab-pane>
                <el-tab-pane label="Review" name="review">

                    <el-form-item label="Nickname">
                        <el-text>{{ row.creator && row.creator.nickname }}</el-text>
                    </el-form-item>

                    <el-form-item label="Rate">
                        <el-slider v-model="row.rate" show-stops :min="1" :max="5" style="width: 150px;" />
                    </el-form-item>

                    <el-form-item label="Spent">
                        <el-text>{{ row.spent }}</el-text>
                    </el-form-item>

                    <el-form-item label="Earned">
                        <el-text>{{ row.earned }}</el-text>
                    </el-form-item>

                    <el-form-item label="Currency code">
                        <el-text>{{ row.currencyCode }}</el-text>
                    </el-form-item>

                    <el-form-item label="Content">
                        <el-input v-model="row.content" type="textarea" />
                    </el-form-item>

                    <el-form-item label="Photos">
                        <el-upload
                            v-model:file-list="fileList"
                            action="/admin/infra/resource-file/create-resource-file"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleUploadSuccess"
                            :before-upload="beforeUpload"
                        >
                            <el-icon class="el-icon-plus uploader-icon">
                                <el-icon-plus />
                            </el-icon>
                        </el-upload>
                        <el-dialog v-model="dialogVisible">
                            <img w-full :src="dialogImageUrl" alt="Preview Image" />
                        </el-dialog>
                    </el-form-item>

                </el-tab-pane>
            </el-tabs>


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
import {findReview, updateReview} from '@/api/restaurant/restaurant-review'

export default {
  name: 'Edit',
  components: {MultilevelLocalityView},
  props: {
    title: {
      type: String,
      default: 'Edit',
    },
    width: {
      type: String,
      default: '50%',
    },
    height: {
      type: String,
      default: '300px',
    },
    visible: Boolean,
    data: Object,
    id: String,
  },
  data() {
    return {
      row: {},
      activeName: 'basic',

      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,

      uploadFiles: [],

      Plus,
    }
  },
  watch: {
    data: function (val) {
      this.row = val

      if (this.row.photoUrls) {
        this.fileList = []
        for (let index in this.row.photoUrls) {
          this.fileList.push({
            name: '',
            url: this.row.photoUrls[index],
          })
        }
      }
    },
    id: function (val) {
      if (!val) {
        return
      }
      const id = val
      findReview(id).then((res) => {
        console.log(id, res)
        if (!res.data) {
          ElMessage.error(res.message)
          return
        }

        this.row = res.data
        if (this.row.photoUrls) {
          this.fileList = []
          for (let index in this.row.photoUrls) {
            this.fileList.push({
              name: '',
              url: this.row.photoUrls[index],
            })
          }
        }
      })
    }
  },
  created() {
    console.log('created')
  },
  methods: {
    handleGoogleChange() {
      console.log(this.row)
    },

    handleSubmit() {
      this.row.photoUrls = []
      for (let item of this.fileList) {
        if (item.url) {
          if (item.response && item.response.data) {
            this.row.photoUrls.push(item.response.data.fileUrl)
          } else {
            this.row.photoUrls.push(item.url)
          }
        }
      }

      updateReview(this.row).then((res) => {
        if (!res.data) {
          ElMessage.error(res.message)
          return
        }
        ElMessage.success('Success')
        this.handleClose(true)
      })
    },

    handleClose(submitted = false) {
      this.row = {}
      this.$emit('close', submitted)
    },

    beforeUpload(rawFile) {
      if (!(rawFile.type === 'image/jpeg' || rawFile.type === 'image/png')) {
        ElMessage.error('Photo must be JPG / PNG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 500) {
        ElMessage.error('Photo size can not exceed 500MB!')
        return false
      }
      return true
    },

    handleUploadSuccess(response, uploadFile) {
      console.log(response, uploadFile)
    },

    handleLocalityChange(countryId, localityId) {
      this.row.countryId = countryId
      this.row.localityId = localityId
    },

    handleClick(tab, event) {
      console.log(tab, event)
    },

    handlePictureCardPreview(uploadFile) {
      this.dialogImageUrl = uploadFile.url
      this.dialogVisible = true
    },

    handleRemove(uploadFile, uploadFiles) {
      console.log(uploadFile, uploadFiles)
    },
  },
}
</script>

<style lang="scss">
.uploader {
  .image {
    width: 50px;
    height: 50px;
    display: block;
  }

  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    &:hover {
      border-color: var(--el-color-primary);
    }
  }

  .el-icon.uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    text-align: center;
  }
}

.review-edit-tabs > .el-tabs__content {
  padding: 32px;
}

</style>
