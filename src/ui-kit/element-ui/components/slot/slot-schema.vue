<template>
  <StandardForm :config="{ hasValid: false }">
    <template v-slot:basic>
      <el-form-item
        label="插槽名称"
        prop="slotName"
      >
        <el-input
          v-model="slotName"
        />
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';

export default {
  type: 'slot',
  mixins: [schemaItemMixin],
  computed: {
    slotName: {
      get() {
        return this.field.slotName || '';
      },
      set(slotName) {
        this.$set(this.field, 'slotName', slotName || undefined);
      }
    },
  }
};
</script>
