<template>
    <el-dialog
        :title="title"
        :v-model="visible"
        :modal-append-to-body="false"
        :width="width"
        :before-close="handleClose"
    >

        <el-form
            label-position="left"
            label-width="130px"
        >

            <el-tabs v-model="currTabName" tab-position="left" class="restaurant-edit-tabs">
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

                    <el-form-item label="name">
                        <el-input v-model="row.name" type="text" />
                    </el-form-item>

                    <el-form-item label="Cover">
                        <el-input v-model="row.coverUrl" type="hidden" readonly />
                        <el-upload
                            class="uploader"
                            action="/admin/infra/resource-file/create-resource-file"
                            :show-file-list="false"
                            :on-success="handleCoverSuccess"
                            :before-upload="beforeCoverUpload"
                        >
                            <img v-if="row.coverUrl" :src="row.coverUrl" class="image" />
                            <el-icon v-else class="el-icon-plus uploader-icon">
                                <el-icon-plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="Lng">
                        <el-input v-model="row.lng" type="text" maxlength="10" />
                    </el-form-item>

                    <el-form-item label="Lat">
                        <el-input v-model="row.lat" type="text" maxlength="10" />
                    </el-form-item>

                </el-tab-pane>

                <el-tab-pane label="Stats" name="stats">

                    <el-form-item label="Avg earned">
                        <el-text>{{ row.avgEarned }}</el-text>
                    </el-form-item>

                    <el-form-item label="Avg rating">
                        <el-text>{{ row.avgRating }}</el-text>
                    </el-form-item>

                    <el-form-item label="Rating1 Num">
                        <el-text>{{ row.rating1Num }}</el-text>
                    </el-form-item>

                    <el-form-item label="Rating2 Num">
                        <el-text>{{ row.rating2Num }}</el-text>
                    </el-form-item>

                    <el-form-item label="Rating3 Num">
                        <el-text>{{ row.rating3Num }}</el-text>
                    </el-form-item>

                    <el-form-item label="Rating4 Num">
                        <el-text>{{ row.rating4Num }}</el-text>
                    </el-form-item>

                    <el-form-item label="Rating5 Num">
                        <el-text>{{ row.rating5Num }}</el-text>
                    </el-form-item>

                </el-tab-pane>

                <el-tab-pane label="Google maps" name="google">
                    <el-form-item label="Google">
                        <el-switch v-model="row.google" @change="handleGoogleChange" />
                    </el-form-item>

                    <template v-if="row.google">
                        <el-form-item label="Place Id">
                            <el-input v-model="row.placeId" type="text" />
                        </el-form-item>

                        <el-form-item label="Photo Reference">
                            <el-input v-model="row.photoReference" type="text" />
                        </el-form-item>

                        <el-form-item label="Photo Width">
                            <el-input v-model="row.photoWidth" type="number" />
                        </el-form-item>

                        <el-form-item label="Photo Height">
                            <el-input v-model="row.photoHeight" type="number" />
                        </el-form-item>
                    </template>

                </el-tab-pane>

              <el-tab-pane label="Featured" name="featured">

                <el-form-item label="Spec">
                  <el-switch v-model="row.spec" />
                </el-form-item>

                <!--<el-form-item label="Watermark">-->
                <!--  <el-switch v-model="row.watermark" @change="onChangeWatermark" />-->
                <!--</el-form-item>-->

                <template v-if="row.spec">
                  <el-form-item label="BG URL">
                    <el-input v-model="row.watermarkBgUrl" type="hidden" />
                    <el-upload
                      class="uploader"
                      action="/admin/infra/resource-file/create-resource-file"
                      :show-file-list="false"
                      :on-success="onUploadedWatermarkBgUrl"
                    >
                      <img v-if="row.watermarkBgUrl" :src="row.watermarkBgUrl" class="image" />
                      <el-icon v-else class="el-icon-plus uploader-icon">
                        <el-icon-plus />
                      </el-icon>
                    </el-upload>
                  </el-form-item>

                  <el-form-item label="LOGO URL">
                    <el-input v-model="row.watermarkLogoUrl" type="hidden" />
                    <el-upload
                      class="uploader"
                      action="/admin/infra/resource-file/create-resource-file"
                      :show-file-list="false"
                      :on-success="onUploadedWatermarkLogoUrl"
                    >
                      <img v-if="row.watermarkLogoUrl" :src="row.watermarkLogoUrl" class="image" />
                      <el-icon v-else class="el-icon-plus uploader-icon">
                        <el-icon-plus />
                      </el-icon>
                    </el-upload>
                  </el-form-item>
                </template>

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
import {updateRestaurant, findRestaurant} from '@/api/restaurant/restaurant'

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
    visible: Boolean,
    data: Object,
    id: String,
  },
  data() {
    return {
      row: {},

      currTabName: 'basic',

      Plus,
    }
  },
  watch: {
    data: function (val) {
      this.row = val
    },
    id: function (val) {
      if (!val) {
        return
      }
      const id = val
      findRestaurant(id).then((res) => {
        console.log(id, res)
        if (!res.data) {
          ElMessage.error(res.message)
          return
        }

        this.row = res.data
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
      updateRestaurant(this.row).then((res) => {
        if (!res.data) {
          ElMessage.error(res.message)
          return
        }
        ElMessage.success('Success')
        this.handleClose(true)
      })
    },

    handleClose(added = false) {
      this.row = {}
      this.$emit('close', added)
    },

    beforeCoverUpload(rawFile) {
      if (!(rawFile.type === 'image/jpeg' || rawFile.type === 'image/png')) {
        ElMessage.error('Cover picture must be JPG / PNG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 500) {
        ElMessage.error('Cover picture size can not exceed 500MB!')
        return false
      }
      return true
    },

    handleCoverSuccess(response) {
      this.row.coverUrl = response.data.fileUrl
    },

    onChangeWatermark() {
      console.log(this.row)
    },
    onUploadedWatermarkBgUrl(response) {
      this.row.watermarkBgUrl = response.data.fileUrl
    },
    onUploadedWatermarkLogoUrl(response) {
      this.row.watermarkLogoUrl = response.data.fileUrl
    },

    handleLocalityChange(countryId, localityId) {
      this.row.countryId = countryId
      this.row.localityId = localityId
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

.restaurant-edit-tabs > .el-tabs__content {
  padding: 32px;
}

</style>
