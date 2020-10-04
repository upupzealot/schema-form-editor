<template>
  <div>
    <el-form-item
      label="必填"
      style="margin-bottom: 15px;"
    >
      <el-switch v-model="required" />
    </el-form-item>
    <el-form
      v-if="required"
      label-width="80px"
    >
      <el-form-item label="提示">
        <el-input
          v-model="note"
          :placeholder="nodePlaceholder"
        />
      </el-form-item>
      <el-form-item label="时机">
        <el-checkbox-group
          v-model="trigger"
          :min="1"
        >
          <el-checkbox label="change">
            值改变
          </el-checkbox>
          <el-checkbox label="blur">
            失去焦点
          </el-checkbox>
          <el-checkbox label="focus">
            获取焦点
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ruleMinxin from './rule-mixin'
import ruleItemMinxin from './rule-item-mixin'

export default {
  mixins: [ruleMinxin, ruleItemMinxin],
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