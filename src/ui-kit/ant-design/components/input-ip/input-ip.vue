<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    :prop="field.name"
    :name="field.name /* antd 2.x prop 属性改为 name */"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    style="margin-bottom: 0; display: flex; flex-wrap: nowrap;"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <div style="display: flex; align-items: center;">
      <a-input
        v-model="ip0"
        v-model:value="ip0"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        class="ip-snippet"
      />.
      <a-input
        v-model="ip1"
        v-model:value="ip1"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        class="ip-snippet"
      />.
      <a-input
        v-model="ip2"
        v-model:value="ip2"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        class="ip-snippet"
      />.
      <a-input
        v-model="ip3"
        v-model:value="ip3"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        class="ip-snippet"
      />
    </div>
  </component>
</template>

<style scoped>
.form-item .ip-snippet.ant-input {
  margin: 0 4px;
}
.form-item .ip-snippet.ant-input:first-of-type {
  margin-left: 0;
}
.form-item .ip-snippet.ant-input:last-of-type {
  margin-right: 0;
}
</style>

<script>
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'

export default {
  type: 'input-ip',
  mixins: [formItemMixin],
  validators: [{
    name: 'IP',
    key: 'ip',
    func: (r, value, callback) => {
      const errMsg = '请输入正确的 IP 地址，每位 0~255 之间的整数';
      const snippets = value && value.split('.');
      if(snippets && snippets.length === 4) {
        for(let i = 0; i < 4; i++) {
          const snippet = snippets[i];
          let pass = /[\d]+/.test(snippet);
          if(!pass) {
            callback(new Error(errMsg));
            break;
          }
          const num = Number(snippet);
          pass = num >= 0 && num <= 255;
          if(!pass) {
            callback(new Error(errMsg));
            break;
          }
          if(!i && num === 0) {
            callback(new Error('首位不能为 0'));
          }
        }
      } else {
        callback(new Error(errMsg));
      }
      callback();
    }
  }],
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
};
</script>
