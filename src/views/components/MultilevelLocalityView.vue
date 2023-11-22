<template>
  <el-cascader v-model="value" :options="options" filterable clearable @change="handleChange" style="width: 100%"/>
</template>

<script>
import {listMultilevelLocalities} from '@/api/infra/locality'

export default {
  name: 'MultilevelLocalityView',
  props: {
    countryId: String,
    localityId: String,
    change: Function,
  },
  data() {
    return {
      value: [
        this.countryId || 0,
        this.localityId || 0,
      ],
      options: [],
    }
  },
  watch: {
    countryId: function (val) {
      if (!val) {
        this.value = []
      } else {
        this.value[0] = val
      }
    },
    localityId: function (val) {
      if (!val) {
        this.value = []
      } else {
        this.value[1] = val
      }
    },
  },
  created() {
    listMultilevelLocalities().then((res) => {
      this.options = res.data
    })
  },
  methods: {
    handleChange() {
      if (!this.value || this.value.length != 2) {
        return
      }
      this.change(this.value[0], this.value[1])
    },
  },
}
</script>

<style scoped>

</style>
