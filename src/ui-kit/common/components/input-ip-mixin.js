import isVue2 from 'vue'

export default {
  computed: {
    placeholder0() {
      return this.getPlaceholder(0);
    },
    placeholder1() {
      return this.getPlaceholder(1);
    },
    placeholder2() {
      return this.getPlaceholder(2);
    },
    placeholder3() {
      return this.getPlaceholder(3);
    },
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
    getPlaceholder(index) {
      const placeholderStr = this.field.placeholder;
      if(placeholderStr) {
        const snippets = placeholderStr.split('.');
        if(snippets.length === 4) {
          return snippets[index];
        }
      };
      return '';
    },
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
          let next = false;
          const number = parseInt(val);
          if(number || number === 0) {
            snippets.push(`${Math.max(0, Math.min(255, number))}`);
            if(val.length >= 3 || val.endsWith('.') || (number < 100 && number > 25)) {
              next = true;
            }
          } else {
            snippets.push('');
          }
          if(next && index !== 3) {
            this.$refs[`snippet${index + 1}`].select();
          }
        }
      }
      let ipStr = snippets.join('.');
      if(ipStr === '...') {
        ipStr = '';
      }
      this.$set(this.data, this.field.name, ipStr);
    },
    onDelete(index) {
      if(isVue2 && !this[`ip${index}`]) {
        this.$refs[`snippet${index - 1}`].select();
      }
    },
    onDeleteNative(index) {
      if(!isVue2 && !this[`ip${index}`]) {
        this.$refs[`snippet${index - 1}`].select();
      }
    },
    async validate() {
      return new Promise(async resolve => {
        return resolve(false);
      })
    }
  }
}
