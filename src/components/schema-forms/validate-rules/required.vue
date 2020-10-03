<template>
  <el-form-item label="必填">
    <el-form
      label-width="61px"
      :inline="true"
    >
      <el-switch v-model="required" />
      <el-form-item
        v-if="required"
        label="提示"
      >
        <el-input
          v-model="note"
          :placeholder="nodePlaceholder"
        />
      </el-form-item>
    </el-form>
  </el-form-item>
</template>

<script>
import ruleMinxin from './rule-mixin'

export default {
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
    nodePlaceholder() {
      return `请输入${this.field.label}`;
    },
    note: {
      get() {
        return this.rule.note === this.nodePlaceholder ? '' : this.rule.note;
      },
      set(noteStr) {
        this.$set(this.rule, 'note', noteStr || undefined)
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