<template>
  <CodeEditor
    v-model="effect"
    :temp="tempStr"
  />
</template>

<script>
// import CodeEditor from '@/framework/common/code-editor'

const tempStr = `// watch('someField', val => {
//   set('activated', val !== 'someValue');
// });
`

export default {
  components: {
    // CodeEditor,
  },
  data() {
    return {
      tempStr,
    }
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
        this.$set(this.field, 'effect', funcStr || undefined);
      }
    }
  },
}
</script>
