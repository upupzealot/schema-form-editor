<template>
  <el-form
    :label-width="labelWidth"
    class="rule-item-form"
  >
    <el-form-item
      v-if="hasNote"
      label="提示"
    >
      <el-input
        v-model="note"
        :placeholder="notePlaceholder"
      />
    </el-form-item>
    <el-form-item label="时机">
      <el-checkbox-group
        v-model="trigger"
        :min="1"
      >
        <el-checkbox label="change">
          传值改变
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
</template>

<style scoped>
.rule-item-form .el-form-item {
  margin-bottom: 15px;
}
/* .rule-item-form .el-form-item:last-child {
  margin-bottom: -10px;
} */
.rule-item-form .el-checkbox {
  margin-right: 15px;
}
</style>

<script>
import ruleMixin from './rule-mixin';

export default {
  mixins: [ruleMixin],
  props: {
    labelWidth: {
      type: String,
      default() {
        return '50px';
      }
    },
    rule: {
      type: Object,
      default() {
        return {};
      }
    },
    hasNote: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  computed: {
    notePlaceholder() {
      return `请输入${this.field.label}`;
    },
    note: {
      get() {
        return this.rule.note === this.notePlaceholder ? '' : this.rule.note;
      },
      set(noteStr) {
        this.$set(this.rule, 'note', noteStr || undefined)
      }
    },
    trigger: {
      get() {
        if(this.rule.trigger) {
          if(_.isArray(this.rule.trigger)) {
            return this.rule.trigger
          } else {
            return [this.rule.trigger];
          }
        } else {
          return [];
        }
      },
      set(triggers) {
        if(triggers.length === 1) {
          this.$set(this.rule, 'trigger', triggers[0])
        } else {
          this.$set(this.rule, 'trigger', triggers)
        }
      }
    },
  },
}
</script>
