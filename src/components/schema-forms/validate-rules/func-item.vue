<template>
  <el-form
    label-width="50px"
    style="width: 100%;"
  >
    <el-form-item
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
    <RuleItem :rule="rule" :hasNote="false" />
  </el-form>
</template>

<script>
import AceEditor from 'vue2-ace-editor';

import RuleItem from './rule-item';

export default {
  components: {
    AceEditor,
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
        return this.rule.type || 'func';
      },
      set(type) {
        this.rule.type = type;
      }
    },
    func: {
      get() {
        return this.rule.func;
      },
      set(func) {
        if(func) {
          this.rule.func = func;
          if(!this.rule.type) {
            this.rule.type = 'func';
          }
        } else {
          this.rule.func = undefined;
        }
      }
    }
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
