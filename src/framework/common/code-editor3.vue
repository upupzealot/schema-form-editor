<template>
  <AceEditor
    v-model:value="codeStr"
    lang="javascript"
    theme="github"
    width="100%"
    :height="height"
    :style="`height: ${height}`"
    @init="initEditor"
  />
</template>

<script>
import { VAceEditor } from 'vue3-ace-editor';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/snippets/javascript';

export default {
  components: {
    AceEditor: VAceEditor,
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    modelValue: {
      type: String,
      default() {
        return '';
      }
    },
    temp: {
      type: String,
      default() {
        return '';
      }
    },
    height: {
      type: String,
      default() {
        return '160px';
      }
    }
  },
  computed: {
    codeStr: {
      get() {
        return this.modelValue || this.temp;
      },
      set(val) {
        const content = val === this.temp ? '' : val;
        this.$emit('update:modelValue', content);
      }
    }
  },
  methods: {
    initEditor(editor) {
      // require('brace/ext/language_tools');  // language extension prerequsite...
      // require('brace/mode/javascript');     // language
      // require('brace/theme/github');        // theme
      // require('brace/snippets/javascript'); // snippet

      editor.session.setTabSize(2);
    }
  }
}
</script>