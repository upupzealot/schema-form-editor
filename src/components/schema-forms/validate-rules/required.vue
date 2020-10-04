<template>
  <div>
    <el-form-item
      label="必填"
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
  data() {
    return {
      rule: {
        id: this.$id(),
        type: 'required',
      },
    }
  },
  computed: {
    required: {
      get() {
        return this.field.required || false;
      },
      set(req) {
        this.$set(this.field, 'required', req || undefined)
      }
    },
  },
  watch: {
    required: {
      handler(activated) {
        if(activated) {
          this.rules.unshift(this.rule);
          this.rules = this.rules; // 触发 rules set()
        } else {
          this.rules = this.rules.filter(r => r.type !== 'required');
        }
      },
      immediate: true,
    }
  }
}
</script>