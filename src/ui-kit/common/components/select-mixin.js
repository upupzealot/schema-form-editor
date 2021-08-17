import { isNil, isArray } from 'lodash'

export default {
  watch: {
    'field.multiple': {
      handler(multiple) {
        let selected = this.data[this.field.name];
        if(multiple) {
          if(!isArray(selected)) {
            this.$set(this.data, this.field.name, isNil(selected) ? [] : [selected]);
          }
        } else {
          if(isArray(selected)) {
            this.$set(this.data, this.field.name, selected.length ? selected[0] : undefined);
          }
        }
      },
      immediate: true,
    }
  }
}
