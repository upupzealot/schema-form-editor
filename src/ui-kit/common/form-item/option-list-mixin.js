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
      async handler(func) {
        if(func) {
          const getAsyncFunction = new Function(`return Object.getPrototypeOf(async function(){}).constructor;`);
          const AsyncFunction = getAsyncFunction();
          // 只能这样拿到 AsyncFunction
          // 直接写 Object.getPrototypeOf(async function(){}).constructor
          // 会被 babel 转成 Function
          
          let fetchFunc = new AsyncFunction('axios', `${func}`);
          fetchFunc = fetchFunc.bind(this);
          try {
            const options = (await fetchFunc(axios)) || [];
            this.optionList = options;
          } catch (err) { console.log(err) }
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
