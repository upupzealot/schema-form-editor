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
        icon="el-icon-setting"
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
      <AceEditor
        v-model="func"
        lang="javascript"
        theme="github"
        width="100%"
        height="160px"
        @init="initEditor"
      />
    </el-form-item>
    <RuleItem
      :rule="rule"
      :has-note="false"
    />
  </el-form>
</template>

<script>
import _ from 'lodash';

import ruleMixin from './rule-mixin';

import AceEditor from 'vue2-ace-editor';

import RuleItem from './rule-item';
import FuncPresetDialog from './func-preset-dialog'

export default {
  components: {
    AceEditor,
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
  mounted() {
    const { type } = this.field;
    const className = _.upperFirst(_.camelCase(type));
    const fieldComponent = require('@/form-render')[className];
    this.componentValidators = fieldComponent.validators.map(v => {
      return {
        ...v,
        key: `[component]${v.key}`,
        name: `[组件] ${v.name}`,
      };
    }) || [];
  },
  created() {
    this.$set(this.rule, 'type', 'func');
  },
  methods: {
    initEditor(editor) {
      require('brace/ext/language_tools');  // language extension prerequsite...
      require('brace/mode/javascript');     // language
      require('brace/theme/github');        // theme
      require('brace/snippets/javascript'); // snippet

      editor.session.setTabSize(2);
    }
  }
}
</script>
