import isVue2 from 'vue'

export default {
  props: {
    schema: {
      type: Object,
      default() {
        return {};
      }
    },
    field: {
      type: Object,
      default() {
        return {};
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    toUpperCase({ field, data }) {
      const fieldData = data[field.name];
      if(fieldData) {
        isVue2 && this.$set(data, field.name, fieldData.toUpperCase());
        !isVue2 && (data[field.name] = fieldData.toUpperCase());
      }
    },
    toLowerCase({ field, data }) {
      const fieldData = data[field.name];
      if(fieldData) {
        isVue2 && this.$set(data, field.name, fieldData.toLowerCase());
        !isVue2 && (data[field.name] = fieldData.toLowerCase());
      }
    },
  }
}