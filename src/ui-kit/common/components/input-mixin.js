import isVue2 from 'vue';

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
