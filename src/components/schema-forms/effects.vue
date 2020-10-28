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
//   set('activated', val !== 'someValue');
// });
`

export default {
  components: {
    AceEditor,
  },
  computed: {
    field() {
      return this.$store.state.activeField;
    },
    effect: {
      get() {
        return this.field.effect || tempStr;
      },
      set(funcStr) {
        let effect = funcStr;
        effect = effect === tempStr ? '' : effect;
        this.$set(this.field, 'effect', effect || undefined);
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
