<template>
  <el-form
    ref="form"
    :inline="inline"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :model="data"
    :rules="validRules"
    :sfr-form="schema.name || '$root'"
  >
    <component
      :is="inline ? 'span' : 'el-row'"
      :gutter="marginX"
    >
      <component
        :is="inline ? 'span' : 'el-col'"
        v-for="field in fieldList"
        :key="field.name"
        :span="field.span"
      >
        <Input
          v-if="field.type === 'input'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <InputNumber
          v-if="field.type === 'input-number'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <InputIp
          v-if="field.type === 'input-ip'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <InputFile
          v-if="field.type === 'input-file'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Select
          v-if="field.type === 'select'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Cascader
          v-if="field.type === 'cascader'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <ChinaRegion
          v-if="field.type === 'china-region'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <ChinaLocation
          v-if="field.type === 'china-location'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Radio
          v-if="field.type === 'radio'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Checkbox
          v-if="field.type === 'checkbox'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <SSwitch
          v-if="field.type === 'switch'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <DatePicker
          v-if="field.type === 'date-picker'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Blank
          v-if="field.type === 'blank'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <SSlot
          v-if="field.type === 'slot'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        >
          <template
            v-if="field.slotName"
            v-slot:[field.slotName]
          >
            <slot
              :name="field.slotName"
              v-bind="{ schema, field, data }"
            />
          </template>
        </SSlot>
        <Wrapper
          v-if="field.type === 'wrapper'"
          ref="subformItems"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :schema="field"
          :data="data"
          :sup-nodes="supNodeList"
        >
          <template
            v-for="slotName in slotNames"
            v-slot:[slotName]="args"
          >
            <slot
              :name="slotName"
              v-bind="args"
            />
          </template>
        </Wrapper>
        <Subform
          v-if="field.type === 'subform'"
          ref="subformItems"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :schema="field"
          :data="data[field.name]"
          :sup-nodes="supNodeList"
        >
          <template
            v-for="slotName in slotNames"
            v-slot:[slotName]="args"
          >
            <slot
              :name="slotName"
              v-bind="args"
            />
          </template>
        </Subform>
        <ItemList
          v-if="field.type === 'item-list'"
          ref="subformItems"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :schema="field"
          :data="data"
          :sup-nodes="supNodeList"
        >
          <template
            v-for="slotName in slotNames"
            v-slot:[slotName]="args"
          >
            <slot
              :name="slotName"
              v-bind="args"
            />
          </template>
        </ItemList>
      </component>
    </component>
  </el-form>
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
import InputFile from './components/input-file/input-file';
import Select from './components/select/select';
import Cascader from './components/cascader/cascader';
import ChinaRegion from './components/china-region/china-region';
import ChinaLocation from './components/china-location/china-location';
import Radio from './components/radio/radio';
import Checkbox from './components/checkbox/checkbox';
import SSwitch from './components/switch/switch';
import DatePicker from './components/date-picker/date-picker';

import Blank from './components/blank/blank';
import SSlot from './components/slot/slot';
import Wrapper from './components/wrapper/wrapper';
import Subform from './components/subform/subform';
// import ItemList from './components/item-list/item-list';
import isVue2, { reactive } from 'vue';
const IL = isVue2 ? require('./components/item-list/item-list.vue') : require('./components/item-list/item-list3.vue');
const ItemList = IL.default;

let staticConf = isVue2
  ? isVue2.observable({ config: {} })
  : reactive({ config: {} });
function setConfig(key, value) {
  if(_.isObject(key)) {
    if(isVue2) {
      isVue2.set(staticConf, 'config', key);
    } else {
      staticConf.config = key;
    }
  } else {
    if(isVue2) {
      isVue2.set(staticConf.config, key, value);
    } else {
      staticConf.config[key] = value;
    }
    staticConf.config = {
      ...staticConf.config
    }
  }
}
function getConfig(key) {
  if(!key) {
    return staticConf.config;
  } else {
    return staticConf.config[key];
  }
}
export {
  setConfig,
  getConfig,
};

export default {
  name: 'FormRender',
  components: {
    Input,
    InputNumber,
    InputIp,
    InputFile,
    Select,
    Cascader,
    ChinaRegion,
    ChinaLocation,
    Radio,
    Checkbox,
    SSwitch,
    DatePicker,
    Blank,
    SSlot,
    Wrapper,
    Subform,
    ItemList,
  },
  mixins: [formRenderMixin],
  computed: {
    mixedConfig() {
      return _.merge({}, staticConf.config, this.supNodeList[0].config);
    },
    slotNames() {
      const $root = this.supNodeList[0];
      let slotNames = Object.keys($root.$slots || {});
      slotNames = slotNames.concat(Object.keys($root.$scopedSlots || {}));
      return _.uniq(slotNames);
    },
  },
}
</script>
