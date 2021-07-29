<template>
  <StandardForm>
    <template v-slot:basic>
      <el-form-item
        label="占位符"
        prop="placeholder"
      >
        <el-input
          v-model="field.placeholder"
        />
      </el-form-item>

      <el-form-item
        label="文件类型"
        prop="accept"
      >
        <el-input
          v-model="accept"
        />
      </el-form-item>
    </template>

    <!-- 校验 -->
    <template v-slot:valid>
      <RegexpValidate />
    </template>
  </StandardForm>
</template>

<style>
input#file-upload-button {
  height: 40px;
}
</style>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';

import RegexpValidate from '@/framework/schema-item/common/validate-rules/regexp'

export default {
  type: 'input-file',
  components: {
    RegexpValidate,
  },
  mixins: [schemaItemMixin],
  computed: {
    accept: {
      get() {
        return this.field.accept || '';
      },
      set(accept) {
        this.$set(this.field, 'accept', accept || undefined);
      }
    },
    rules: {
      get() {
        return this.field.rules || [];
      },
      set(rules) {
        if(rules.length) {
          this.$set(this.field, 'rules', rules);
        } else {
          this.$set(this.field, 'rules', undefined);
        }
      }
    },
  },
};
</script>
