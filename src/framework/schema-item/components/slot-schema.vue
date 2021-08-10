<template>
  <StandardForm>
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

    <!-- 校验 -->
    <template v-slot:valid>
      <RegexpValidate />
      <FuncValidate />
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';
import RegexpValidate from '@/framework/schema-item/common/validate-rules/regexp'
import FuncValidate from '@/framework/schema-item/common/validate-rules/func'

export default {
  type: 'slot',
  mixins: [schemaItemMixin],
  components: {
    RegexpValidate,
    FuncValidate,
  },
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
