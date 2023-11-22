<template>
  <el-select
    v-model="value"
    filterable
    remote
    reserve-keyword
    placeholder="Please enter a keyword"
    remote-show-suffix
    clearable
    :remote-method="remoteMethod"
    :loading="loading"
    @change="handleChange"
    style="width: 100%"
  >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.nickname"
      :value="item.id"
    />

  </el-select>
</template>

<script>
import {pageMember} from '@/api/member/member'

export default {
  name: 'MemberSelectionView',
  props: {
    id: String,
    change: Function,
  },
  data() {
    return {
      options: [],
      value: '',
      loading: false,
    }
  },
  watch: {
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true

        pageMember({
          page: 1,
          pageSize: 20,
          nickname: query
        }).then(response => {
          this.loading = false
          this.options = response.data.data.filter((item) => {
            return item.nickname.toLowerCase().includes(query.toLowerCase())
          })
        })
      } else {
        this.options = []
      }
    },
    handleChange() {
      this.change(this.value)
    },
  },
}
</script>

<style scoped>

</style>
