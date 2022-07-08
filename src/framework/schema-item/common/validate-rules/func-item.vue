<template>
  <el-form
    label-width="50px"
    style="width: 100%;"
  >
    <el-form-item
      label="类型"
      style="margin-bottom: 15px;"
    >
      <el-switch
        v-model="isPreset"
        active-text="预设函数"
        inactive-text="自定义函数"
      />
    </el-form-item>
    <el-form-item
      v-show="isPreset"
      label="规则"
      style="margin-bottom: 15px;"
    >
      <el-select v-model="preset">
        <el-option
          v-for="validFunc in validFuncList"
          :key="validFunc.key"
          :label="validFunc.name"
          :value="validFunc.key"
        />
      </el-select>
      <el-button
        :icon="isVue2 ? 'el-icon-setting' : Setting"
        style="margin-left: 10px;"
        @click="$refs['funcPresetDialog'].show()"
      />
      <FuncPresetDialog ref="funcPresetDialog" />
    </el-form-item>
    <el-form-item
      v-show="!isPreset"
      label="规则"
      style="margin-bottom: 15px;"
    >
      <CodeEditor v-model="func" />
    </el-form-item>
    <RuleItem
      :rule="rule"
      :has-note="false"
    />
  </el-form>
</template>

<script>
import _ from 'lodash';

import isVue2 from '@/ui-kit/common/util-is-vue2';
import ruleMixin from './rule-mixin';

// import CodeEditor from '@/framework/common/code-editor';
import RuleItem from './rule-item';
import FuncPresetDialog from './func-preset-dialog'

export default {
  components: {
    // CodeEditor,
    RuleItem,
    FuncPresetDialog,
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
  data() {
    return {
      isVue2,
      componentValidators: [],
      tempPreset: undefined,
      tempFunc: undefined,
    }
  },
  computed: {
    isPreset: {
      get() {
        return this.rule.isPreset !== false;
      },
      set(preset) {
        this.$set(this.rule, 'isPreset', preset === false ? false : undefined);
      }
    },
    isComponent: {
      get() {
        return this.rule.isComponent || undefined;
      },
      set(isComponent) {
        this.$set(this.rule, 'isComponent', !!isComponent);
      }
    },
    preset: {
      get() {
        return this.rule.preset || '';
      },
      set(preset) {
        this.$set(this.rule, 'preset', preset || undefined);
      }
    },
    validFuncList() {
      return this.componentValidators.concat(this.validFuncs);
    },
    func: {
      get() {
        return this.rule.func || '';
      },
      set(func) {
        if(func) {
          this.$set(this.rule, 'func', func);
        } else {
          this.$set(this.rule, 'func', undefined);
        }
      }
    }
  },
  watch: {
    isPreset() {
      if(this.isPreset) {
        this.tempFunc = this.func;
        this.func = undefined;
        this.preset = this.tempPreset;
      } else {
        this.tempPreset = this.preset;
        this.preset = undefined;
        this.func = this.tempFunc;
      }
    },
  },
  created() {
    this.$set(this.rule, 'type', 'func');
  },
  mounted() {
    const { type } = this.field;
    const className = _.upperFirst(_.camelCase(type));
    const fieldComponent = require('@/ui-kit/element-ui/index.js')[className];
    if(fieldComponent.validators && fieldComponent.validators.length) {
      this.componentValidators = fieldComponent.validators.map(v => {
        return {
          ...v,
          key: `[component]${v.key}`,
          name: `[组件] ${v.name}`,
        };
      }) || [];
    }
  },
}
</script>
