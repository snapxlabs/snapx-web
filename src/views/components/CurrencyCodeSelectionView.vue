<template>
  <el-select v-model="value" filterable clearable placeholder="Select" @change="handleChange" style="width: 100%">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.code"
      :value="item.code"
    >
      <span style="float: left">{{ item.name }}</span>
      <span
        style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
      >{{ item.code }} ({{ item.symbol }})</span
      >
    </el-option>
  </el-select>
</template>

<script>
import {listCurrencies} from '@/api/infra/currency'

export default {
  name: 'CurrencyCodeSelectionView',
  props: {
    change: Function,
  },
  data() {
    return {
      options: [],
      value: '',
    }
  },
  created() {
    listCurrencies().then((res) => {
      this.options = res.data
    })
  },
  methods: {
    handleChange() {
      this.change(this.value)
    },
  },
}
</script>

<style scoped>

</style>
