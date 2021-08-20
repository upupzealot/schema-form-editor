import { isBoolean } from 'lodash';

export default {
  data() {
    return {
      checkAll: false,
    }
  },
  created() {
    if(!this.data[this.field.name]) {
      this.$set(this.data, this.field.name, []);
    }    
  },
  computed: {
    isIndeterminate() {
      const fieldData = this.data[this.field.name];
      return !!fieldData.length && fieldData.length < this.optionList.length;
    },
  },
  methods: {
    onCheckAllChange(val) {
      let checkedAll = val;
      if(!isBoolean(val)) {
        const event = val; // ant-design 下，val 是一个 event
        checkedAll = event.target.checked;
      }
      this.checkAll = checkedAll;
      if(this.checkAll) {
        this.$set(this.data, this.field.name, this.optionList.map(o => o.value));
      } else {
        this.$set(this.data, this.field.name, []);
      }
    },
    onChange() {
      const fieldData = this.data[this.field.name];
      this.checkAll = fieldData.length === this.optionList.length;
    }
  }
}
