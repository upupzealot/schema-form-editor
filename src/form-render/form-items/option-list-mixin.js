import axios from 'axios';

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
          axios.get(api, {
            headers:{
              'content-type': 'application/json'
            }
          })
            .then(res => {
              if(res.status === 200) {
                const { data } = res;
                return data;
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
    },
    'field.remoteConf.func': {
      handler(func) {
        let fetchFunc = new Function(func);
        fetchFunc = fetchFunc.bind(this);
        try {
          this.optionList = fetchFunc() || [];
        } catch (err) {}
      },
      immediate: true,
    }
  },
};
