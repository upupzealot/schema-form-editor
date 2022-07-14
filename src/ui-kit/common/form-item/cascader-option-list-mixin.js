import _ from 'lodash';
import optionListMixin from './option-list-mixin';

const mixin = _.cloneDeep(optionListMixin);

mixin.data = function () {
  return {
    options: this.field.options || [],
    selected: [],
  }
}

mixin.computed.isRemote = function () {
  return true;
}
mixin.computed.fieldData = {
  get() {
    return this.data[this.field.name];
  },
  set(val) {
    if(val) {
      this.$set(this.data, this.field.name, val);
    } else {
      this.$set(this.data, this.field.name, undefined);
    }
  }
}
mixin.computed.optionMap = function () {
  const optionsInFlat = this.flatOptions(this.optionList);
  return _.keyBy(optionsInFlat, 'value')
}

mixin.watch.selected = function (selected) {
  if(selected && selected.length) {
    const lastVal = this.selected[this.selected.length - 1];
    this.fieldData = lastVal;
  } else {
    this.fieldData = undefined;
  }
};

// 当 fieldData 或 optionList 发生变化时，刷新回填
function refreshFillback (val) {
  if(this.optionMap && this.optionMap[this.fieldData]) {
    let option = this.optionMap[this.fieldData];
    let selected = [];
    while(option) {
      selected.unshift(option.value);
      const pid = option.__pid__;
      option = pid && this.optionMap[pid];
    }
    let isEqual = selected.length === this.selected.length;
    if(!isEqual) {
      this.selected = selected;
    }
    for(let i = 0; i < selected.length; i++) {
      isEqual = selected[i] === this.selected[i];
      if(!isEqual) {
        this.selected = selected;
      }
      break;
    }
  }
}

mixin.watch.fieldData = {
  handler: refreshFillback,
  immediate: true,
}
mixin.watch.optionMap = {
  handler: refreshFillback,
  immediate: true,
}

mixin.methods.parseOptions = function (options) {
  const valueKey = this.field.remoteConf?.valueKey || 'id';
  const labelKey = this.field.remoteConf?.labelKey || 'name';
  const childrenKey = this.field.remoteConf?.childrenKey || 'children';

  return options.map(option => {
    return {
      value: option[valueKey],
      label: option[labelKey],
      children: option[childrenKey] && this.parseOptions(option[childrenKey].map(child => ({
        ...child,
        __pid__: option[valueKey],
      }))),
      __pid__: option.__pid__,
    }
  });
}
mixin.methods.flatOptions = function (options) {
  const childrenKey = this.field.remoteConf?.childrenKey || 'children';
  return _.flatMap(options, option => {
    return [_.omit(option, childrenKey), ...this.flatOptions(option[childrenKey])];
  });
}

export default mixin;
