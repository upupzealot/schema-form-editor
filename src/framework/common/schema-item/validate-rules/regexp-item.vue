<template>
  <el-form
    label-width="50px"
    style="width: 100%;"
  >
    <el-form-item
      label="规则"
      style="margin-bottom: 15px;"
    >
      <el-input v-model="rule.regexp" />
    </el-form-item>
    <RuleItem :rule="rule" />
  </el-form>
</template>

<script>
import ruleMixin from './rule-mixin';

import RuleItem from './rule-item';

export default {
  components: {
    RuleItem,
  },
  mixins: [ruleMixin],
  props: {
    rule: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    regexp: {
      get() {
        return this.rule.regexp;
      },
      set(regexp) {
        if(regexp) {
          this.rule.regexp = regexp;
          if(!this.rule.type) {
            this.rule.type = 'regexp';
          }
        } else {
          this.rule.regexp = undefined;
        }
      }
    }
  },
  created() {
    this.$set(this.rule, 'type', 'regexp');
  },
}
</script>
