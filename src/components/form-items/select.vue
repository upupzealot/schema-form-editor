<template>
  <el-form-item
    v-if="enabled"
    :label="field.label"
    class="form-item"
  >
    <el-select
      v-model="data[field.name]"
      placeholder="下拉选项"
      style="width: 100%"
    >
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </el-form-item>
</template>

<script>
import standardMixin from './standard-mixin'

export default {
  mixins: [standardMixin],
  data() {
    return {
      options: [],
    }
  },
  computed: {
    options: {
      get() {
        return this.field.options;
      },
      set(options) {
        return this.$set(this.field, 'options', options);
      }
    },
  },
  watch: {
    'field.remoteConf.api': {
      handler(api) {
        if(api) {
          fetch(api)
            .then(res => {
              if(res.ok) {
                return res.json();
              } else {
                throw new Error(res.statusText)
              }
            })
            .then(resData => {
              const { success, message, data } = resData;
              if(success) {
                const { list } = data;
                const options = list.map(item => ({
                  label: item[this.field.remoteConf.labelKey || 'name'],
                  value: item[this.field.remoteConf.valueKey || 'id'],
                }));
                this.options = options;
              } else {
                throw new Error(message)
              }
            })
            .catch(console.error); // eslint-disable-line
        }
      },
      immediate: true,
    }
  },
  defaultSchema: {
    options: [{
      label: '选项一',
      value: 'option1',
    }, {
      label: '选项二',
      value: 'option2',
    }],
  }
};
</script>
