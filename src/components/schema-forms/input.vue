<template>
  <StandardForm>
    <template slot="basic">
      <el-form-item
        label="组件模式"
        class="schema-form"
      >
        <el-select v-model="mode">
          <el-option
            label="单行文本"
            value="text"
          />
          <el-option
            label="多行文本"
            value="textarea"
          />
        </el-select>
      </el-form-item>
    </template>
    <template slot="valid">
      <el-form-item
        label="校验类型"
        class="schema-form"
      >
        <el-radio
          v-model="field.validType"
          label="required"
        >
          必填
        </el-radio>
        <el-radio
          v-model="field.validType"
          label="length"
        >
          长度
        </el-radio>
        <el-radio
          v-model="field.validType"
          label="regexp"
        >
          正则表达式
        </el-radio>
        <el-radio
          v-model="field.validType"
          label="func"
          disabled
        >
          自定义函数
        </el-radio>
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import standard from './standard-mixin';

export default {
  mixins: [standard],
  computed: {
    mode: {
      get() {
        return this.field.mode || 'text';
      },
      set(mode) {
        this.$set(this.field, 'mode', mode === 'textarea' ? 'textarea' : undefined);
      }
    },
  },
};
</script>
