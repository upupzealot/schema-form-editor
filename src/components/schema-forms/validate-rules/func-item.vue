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
          v-for="validFunc in validFuncs"
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
        this.$set(this.rule, 'isPreset', preset);
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
    }
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
