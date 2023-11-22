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
      :label="item.name"
      :value="item.id"
    />

  </el-select>
</template>

<script>
import {pageRestaurants} from '@/api/restaurant/restaurant'

export default {
  name: 'RestaurantSelectionView',
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
  watch: {},
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true

        pageRestaurants({
          page: 1,
          pageSize: 20,
          name: query,
        }).then(response => {
          this.loading = false
          this.options = response.data.data.filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase())
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
