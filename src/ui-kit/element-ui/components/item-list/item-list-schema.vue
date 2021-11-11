<template>
  <StandardForm :config="{ hasValid: false }">
    <template v-slot:basic>
      <el-form-item
        label="新增按钮"
        prop="createBtnText"
      >
        <el-input
          v-model="createBtnText"
          placeholder="新增列表项"
        />
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';

export default {
  type: 'item-list',
  mixins: [schemaItemMixin],
  computed: {
    createBtnText: {
      get() {
        return this.field.createBtnText;
      },
      set(val) {
        const createBtnText = val === '新增列表项' ? undefined : val;
        this.$set(this.field, 'createBtnText', createBtnText);
      }
    }
  }
};
</script>
