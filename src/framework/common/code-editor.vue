<template>
  <AceEditor
    v-model="codeStr"
    lang="javascript"
    theme="github"
    width="100%"
    :height="height"
    @init="initEditor"
  />
</template>

<script>
import AceEditor from 'vue2-ace-editor';

export default {
  components: {
    AceEditor,
  },
  model: {
    prop: 'code',
    event: 'change',
  },
  props: {
    code: {
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
        return this.code || this.temp;
      },
      set(code) {
        const content = code === this.temp ? '' : code;
        this.$emit('change', content);
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