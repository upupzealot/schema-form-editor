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
    'field.options': {
      handler(options) {
        this.options = options;
        if(this.isRemote) {
          this.$delete(this.field, 'options');
        }
      }
    },
    'field.remoteConf.api': {
      handler(api) {
        if(api) {
          const headers = (this.config && this.config.axios && this.config.axios.headers) || {};
          const baseUrl = (this.config && this.config.axios && this.config.axios.baseUrl) || '';
          let apiUrl = api;
          if(api.startsWith('/')) {
            apiUrl = `${baseUrl}${apiUrl}`;
          }

          axios.get(apiUrl, {
            headers:{
              ...headers,
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
              const { success, code, message, data } = resData;
              if(success || code === 0 || code === 200) {
                let list = [];
                if(data.list) {
                  list = data.list;
                } else {
                  list = data;
                }
                const options = this.parseOptions(list);
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
        if(func) {
          let fetchFunc = new Function('axios', `(async ()=>{${func}})();`);
          fetchFunc = fetchFunc.bind(this);
          try {
            const list = fetchFunc(axios) || [];
            const options = this.parseOptions(list);
            this.optionList = options;
          } catch (err) {}
        }
      },
      immediate: true,
    }
  },
  methods: {
    parseOptions(options) {
      return options.map(option => ({
        label: option[this.field.remoteConf.labelKey || 'name'],
        value: option[this.field.remoteConf.valueKey || 'id'],
      }));
    },
  }
};
