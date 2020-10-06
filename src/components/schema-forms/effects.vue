<template>
  <AceEditor
    v-model="effect"
    lang="javascript"
    theme="github"
    width="100%"
    height="160px"
    @init="initEditor"
  />
</template>

<script>
import AceEditor from 'vue2-ace-editor';

const tempStr = `// watch('someField', val => {
//   set('enabled', val !== 'someValue');
// });
`

export default {
  components: {
    AceEditor,
  },
  data() {
    return {
      funcStr: '',
    }
  },
  computed: {
    field() {
      return this.$store.state.activeField;
    },
    effect: {
      get() {
        return this.funcStr || tempStr;
      },
      set(funcStr) {
        this.funcStr = funcStr === tempStr ? '' : funcStr;
        this.$set(this.field, 'effect', this.funcStr || undefined);
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
