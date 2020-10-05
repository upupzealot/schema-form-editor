<template>
  <div>
    <AceEditor
      v-model="effect"
      lang="javascript"
      theme="github"
      width="100%"
      height="100px"
      @init="initEditor"
    />
  </div>
</template>

<script>
import AceEditor from 'vue2-ace-editor';

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
        // watch('aaa', val => {
        //   set('enabled', val !== 'aaa');
        // });
        return this.field.effect || '';
      },
      set(funcStr) {
        this.$set(this.field, 'effect', funcStr);
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
