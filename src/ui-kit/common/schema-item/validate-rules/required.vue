<template>
  <div>
    <el-form-item
      label="必填"
      label-width="40px"
      style="margin-bottom: 15px;"
    >
      <el-switch v-model="required" />
    </el-form-item>
    <RuleItem
      v-if="required"
      label-width="80px"
      :rule="rule"
    />
  </div>
</template>

<script>
import ruleMinxin from './rule-mixin'

import RuleItem from './rule-item'

export default {
  components: {
    RuleItem,
  },
  mixins: [ruleMinxin],
  computed: {
    required: {
      get() {
        return this.field.required || false;
      },
      set(req) {
        this.$set(this.field, 'required', req || undefined)
      }
    },
    rule() {
      const reqRules = this.rules.filter(r => r.type === 'required');
      // 每次生成一个新的对象，避免多个字段的 required rule 冲突
      const reqRule = reqRules.length ? reqRules[0] : {
        id: this.$id(),
        type: 'required',
      };
      return reqRule;
    },
  },
  watch: {
    required: {
      handler(activated) {
        if(activated) {
          let rules = this.rules.filter(r => r.type !== 'required');
          rules.unshift(this.rule);
          this.rules = rules;
        } else {
          this.rules = this.rules.filter(r => r.type !== 'required');
        }
      },
      immediate: true,
    }
  }
}
</script>