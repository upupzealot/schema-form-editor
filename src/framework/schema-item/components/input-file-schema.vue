<template>
  <StandardForm>
    <template v-slot:basic>
      <Placeholder />

      <el-form-item
        label="文件类型"
        prop="accept"
      >
        <el-input
          v-model="accept"
        />
      </el-form-item>
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

import Placeholder from '@/framework/schema-item/common/placeholder'

export default {
  type: 'input-file',
  mixins: [schemaItemMixin],
  components: {
    Placeholder
  },
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
