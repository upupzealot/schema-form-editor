export default {
  computed: {
    ip0: {
      get() { return this.getSnippet(0) },
      set(val) { this.setSnippet(0, val) },
    },
    ip1: {
      get() { return this.getSnippet(1) },
      set(val) { this.setSnippet(1, val) },
    },
    ip2: {
      get() { return this.getSnippet(2) },
      set(val) { this.setSnippet(2, val) },
    },
    ip3: {
      get() { return this.getSnippet(3) },
      set(val) { this.setSnippet(3, val) },
    }
  },
  methods: {
    getSnippet(index) {
      const ipStr = this.data[this.field.name];
      if(ipStr) {
        const snippets = ipStr.split('.');
        if(snippets.length === 4) {
          const snippet = snippets[index];
          return /^[0]+$/.test(snippet) ? '0' : snippet.replace(/^[0]+/, '');
        }
      };
      return '';
    },
    setSnippet(index, val) {
      const snippets = [];
      for(let i = 0; i < 4; i++) {
        if(i !== index) {
          snippets.push(this[`ip${i}`]);
        } else {
          const snippet = /^[0]+$/.test(val) ? '0' : val.replace(/^[0]+/, '');
          snippets.push(snippet);
        }
      }
      let ipStr = snippets.join('.');
      if(ipStr === '...') {
        ipStr = '';
      }
      this.$set(this.data, this.field.name, ipStr);
    },
    async validate() {
      return new Promise(async resolve => {
        return resolve(false);
      })
    }
  }
}
