<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    :[formItemPropName]="field.name"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{
      marginBottom: colMarginY,
      display: 'flex',
      flexDirection: isLabelTop ? 'column' : '',
      flexWrap: 'nowrap',
    }"
    :sfr-f="field.name"
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
        :read-only="readonly"
        class="ip-snippet"
      />.
      <a-input
        v-model="ip1"
        v-model:value="ip1"
        :type="field.mode"
        :disabled="disabled"
        :read-only="readonly"
        class="ip-snippet"
      />.
      <a-input
        v-model="ip2"
        v-model:value="ip2"
        :type="field.mode"
        :disabled="disabled"
        :read-only="readonly"
        class="ip-snippet"
      />.
      <a-input
        v-model="ip3"
        v-model:value="ip3"
        :type="field.mode"
        :disabled="disabled"
        :read-only="readonly"
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
import formItemMixin from '../../common/form-item/mixin'
import inputIpMixin from '../../../common/components/input-ip-mixin'

export default {
  type: 'input-ip',
  mixins: [formItemMixin, inputIpMixin],
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
  
};
</script>
