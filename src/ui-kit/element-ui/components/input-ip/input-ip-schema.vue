<template>
  <StandardForm>
    <!-- 校验 -->
    <template v-slot:valid>
      <RegexpValidate />
      <FuncValidate />
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/common/schema-item/mixin';

import RegexpValidate from '@/framework/common/schema-item/validate-rules/regexp'
import FuncValidate from '@/framework/common/schema-item/validate-rules/func'

export default {
  type: 'input-ip',
  components: {
    RegexpValidate,
    FuncValidate,
  },
  mixins: [schemaItemMixin],
  computed: {
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
  methods: {
    createRule() {
      const id = this.$id();
      this.rules = [{
        id,
        type: 'regexp',
      }, ...this.rules];
    },
    deleteRule(rule) {
      this.$confirm('确认删除?', null, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      }).then(() => {
        this.rules = this.rules.filter(r => r.id !== rule.id);

        this.$message({
          type: 'success',
          message: '已删除',
        });
      }).catch(() => {});
    },
  }
};
</script>
