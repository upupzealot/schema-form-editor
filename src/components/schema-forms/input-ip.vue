<template>
  <StandardForm>
    <!-- 校验 -->
    <template slot="valid">
      <RegexpValidate />
    </template>
  </StandardForm>
</template>

<script>
import standard from './standard-mixin';

import RegexpValidate from '@/components/schema-forms/validate-rules/regexp'

export default {
  components: {
    RegexpValidate,
  },
  mixins: [standard],
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
