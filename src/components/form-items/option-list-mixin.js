export default {
  data() {
    return {
      options: this.field.options || [],
    }
  },
  computed: {
    optionList: {
      get() {
        return this.options || [];
      },
      set(options) {
        this.options = options;
      }
    },
  },
  watch: {
    optionList: {
      handler(newValue) {
        if(this.field.isRemote) {
          this.$delete(this.field, 'options');
        } else {
          this.options = newValue;
          this.$set(this.field, 'options', newValue);
        }
      }
    },
    'field.options': {
      handler(newValue) {
        if(this.field.isRemote) {
          this.$delete(this.field, 'options');
        } else {
          this.options = newValue;
          this.$set(this.field, 'options', newValue);
        }
      }
    },
    'field.remoteConf.api': {
      handler(api) {
        if(api) {
          fetch(api)
            .then(res => {
              if(res.ok) {
                return res.json();
              } else {
                throw new Error(res.statusText)
              }
            })
            .then(resData => {
              const { success, message, data } = resData;
              if(success) {
                const { list } = data;
                const options = list.map(item => ({
                  label: item[this.field.remoteConf.labelKey || 'name'],
                  value: item[this.field.remoteConf.valueKey || 'id'],
                }));
                this.optionList = options;
              } else {
                throw new Error(message)
              }
            })
            .catch(console.error); // eslint-disable-line
        }
      },
      immediate: true,
    }
  },
  method: {
    
  }
};
