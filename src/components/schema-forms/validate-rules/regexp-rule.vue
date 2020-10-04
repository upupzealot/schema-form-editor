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
import RuleItem from './rule-item';

export default {
  components: {
    RuleItem,
  },
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    },
    rule: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    type: {
      get() {
        return this.rule.type || 'regexp';
      },
      set(type) {
        this.rule.type = type;
      }
    },
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
  }
}
</script>
