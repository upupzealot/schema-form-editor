<template>
  <component
    :is="formIs"
    ref="form"
    :layout="layout"
    :label-align="labelAlign"
    :model="data"
    :rules="validRules"
  >
    <component
      :is="inline ? 'span' : 'a-row'"
      :gutter="marginX"
    >
      <component
        :is="inline ? 'span' : 'a-col'"
        v-for="field in fieldList"
        :key="field.name"
        :span="field.span || 24"
        :style="{ marginBottom: colMarginY(field) }"
      >
        <Input
          v-if="field.type === 'input'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <InputNumber
          v-if="field.type === 'input-number'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <InputIp
          v-if="field.type === 'input-ip'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Select
          v-if="field.type === 'select'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Radio
          v-if="field.type === 'radio'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Checkbox
          v-if="field.type === 'checkbox'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <SSwitch
          v-if="field.type === 'switch'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <DatePicker
          v-if="field.type === 'date-picker'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Blank
          v-if="field.type === 'blank'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Wrapper
          v-if="field.type === 'wrapper'"
          ref="subformItems"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :schema="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Subform
          v-if="field.type === 'subform'"
          ref="subformItems"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :schema="field"
          :data="data[field.name]"
          :sup-nodes="supNodeList"
        />
        <ItemList
          v-if="field.type === 'item-list'"
          ref="subformItems"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :schema="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
      </component>
    </component>
  </component>
</template>

<style>
.form-item.readonly {
  pointer-events: none;
}
</style>

<script>
import _ from 'lodash';

import formRenderMixin from '../common/form-render-mixin';

import Input from './components/input/input';
import InputNumber from './components/input-number/input-number';
import InputIp from './components/input-ip/input-ip';
import Select from './components/select/select';
import Radio from './components/radio/radio';
import Checkbox from './components/checkbox/checkbox';
import SSwitch from './components/switch/switch';
import DatePicker from './components/date-picker/date-picker';

import Blank from './components/blank/blank';
import Wrapper from './components/wrapper/wrapper';
import Subform from './components/subform/subform';
// import ItemList from './components/item-list/item-list';
import isVue2 from 'vue';
const IL = isVue2 ? require('./components/item-list/item-list.vue') : require('./components/item-list/item-list3.vue');
const ItemList = IL.default;

export default {
  name: 'FormRender',
  mixins: [formRenderMixin],
  components: {
    Input,
    InputNumber,
    InputIp,
    Select,
    Radio,
    Checkbox,
    SSwitch,
    DatePicker,
    Blank,
    Wrapper,
    Subform,
    ItemList,
  },
  computed: {
    formIs() {
      return isVue2 ? 'a-form-model' : 'a-form';
    },
    
    marginY() {
      return this.formConf.marginY || 15;
    },
    layout() {
      return this.inline ? 'inline' :
      (this.labelPosition === 'right'
        || this.labelPosition === 'left'
        ? 'horizontal' : 'vertical');
    },
    labelAlign() {
      return this.layout === 'horizontal' ? this.labelPosition : 'right';
    },
  },
  methods: {
    colMarginY(field) {
      if(field.activated === false || field.visible === false) {
        return '0';
      } else if(field.type === 'wrapper' || field.type === 'subform' ) {
        return `${this.marginY - (field.formConf.marginY || 15)}px`;
      } else {
        return `${this.marginY}px`;
      }
    },
  }
}
</script>
