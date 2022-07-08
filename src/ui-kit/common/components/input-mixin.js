import isVue2 from '../util-is-vue2'

export default {
  methods: {
    fieldSubmitNative() {
      isVue2 && this.fieldSubmit();
    },
    fieldSubmitUnnative() {
      !isVue2 && this.fieldSubmit();
    }
  }
}
