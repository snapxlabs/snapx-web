<template>
    <div class="app-container">
        <el-container>
            <el-header>
                <el-button
                    type="primary"
                    size="small"
                    :icon="Plus"
                    @click="onAdd"
                >Add</el-button>
            </el-header>
            <el-main height="">
                <el-table
                    v-loading="tableLoding"
                    :data="dataList"
                    element-loading-text="Loading"
                    fit
                    highlight-current-row
                    style="width: 600px"
                >
                    <el-table-column
                        :align="center"
                        type="index"
                        label="No"
                    >
                        <template #default="scope">
                            {{ scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        label="Acatar"
                        width="100"
                    >
                        <template #default="scope">
                            <el-image style="width: 50px;" :src="scope.row.avatarUrl" fit="contain" />
                        </template>
                    </el-table-column>
                    <el-table-column
                        :align="center"
                        width="210"
                        label="Cover"
                    >
                        <template #default="scope">
                            <el-image style="width: 200px;" :src="scope.row.avatarCoverUrl" fit="contain" />
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Operation"
                        :align="center"
                    >
                        <template #default="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                :icon="ElIconEdit"
                                @click="onEdit(scope.$index)"
                            >Edit</el-button>
                            <el-button
                                type="danger"
                                size="mini"
                                :icon="ElIconDelete"
                                @click="onRemove(scope.$index)"
                            >Remove</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer />
        </el-container>
        <Editor
            :action="editor.action"
            :title="editor.title"
            :visible="editor.visible"
            :data="editor.data"
            @updated="reloadTable"
        />
    </div>
</template>

<script setup>
import { listMemberAvatar, deleteMemberAvatar } from '@/api/system/member-avatar'
import { $ref } from 'vue/macros'
import { ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import Editor from './Editor.vue'
import { Plus } from '@element-plus/icons'

let tableLoding = $ref(false)
let dataList = $ref([])

onMounted(reloadTable)

function reloadTable() {
  tableLoding = true
  listMemberAvatar().then((response) => {
    dataList = [... response.data]
    tableLoding = false
  })
}

const [editor, onAdd, onEdit] = useEditor()

function useEditor() {
  const action = ref('add')
  const title = ref('Create Notice')
  const visible = ref(false)
  const data = ref({})

  return [
    { action, title, visible, data },
    () => {
      action.value = 'add'
      title.value = 'Create Avatar'
      visible.value = true
    },
    index => {
      data.value = dataList[index]
      action.value = 'edit'
      title.value = 'Edit Avatar'
      visible.value = true
    },
  ]
}

function onRemove(index) {
  ElMessageBox.confirm('You will remove this Avatar, whether to continue?', 'Info', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    let data = dataList[index]
    deleteMemberAvatar({
      'ids': [
        data.avatarMaterialGalleryId, data.avatarCoverMaterialGalleryId
      ]
    }).then(reloadTable)
  })
}

</script>