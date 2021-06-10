<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{ marginBottom: colMarginY }"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-cascader
      v-model="selected"
      size="large"
      :options="options"
      :clearable="field.clearable !== false"
      :filterable="field.filterable"
      style="width: 100%"
    />
  </el-form-item>
</template>

<style>
.form-item.readonly .el-input__suffix-inner {
  pointer-events: none;
}
</style>

<script>
import { provinceAndCityData, regionData, CodeToText, TextToCode } from 'element-china-area-data'

import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  data() {
    return {
      selected: this.data[this.field.name] || [],
    }
  },
  computed: {
    options() {
      return this.mode === 'province-city-district'
        ? regionData : provinceAndCityData;
    },
    mode() {
      return this.field.mode || 'province-city-district';
    },
    valueFormat() {
      return this.field.valueFormat || 'code';
    },
    mapLevels() {
      return !!this.field.mapLevels;
    },
    provinceKey() {
      return this.field.provinceKey || 'province';
    },
    cityKey() {
      return this.field.cityKey || 'city';
    },
    districtKey() {
      return this.field.districtKey || 'district';
    },
    provinceVal() { // 省级字段值
      if(this.selected && this.selected.length) {
        if(this.valueFormat === 'code') {
          return this.selected[0];
        } else {
          return CodeToText[this.selected[0]];
        }
      } else {
        return undefined;
      }
    },
    cityVal() { // 市级字段值
      if(this.selected && this.selected.length) {
        if(this.valueFormat === 'code') {
          return this.selected[1];
        } else {
          return CodeToText[this.selected[1]];
        }
      } else {
        return undefined;
      }
    },
    districtVal() { // 区级字段值
      if(this.selected && this.selected.length && this.mode === 'province-city-district') {
        if(this.valueFormat === 'code') {
          return this.selected[2];
        } else {
          return CodeToText[this.selected[2]];
        }
      } else {
        return undefined;
      }
    },
    arrayVal() {
      if(this.selected && this.selected.length && !this.mapLevels) {
        if(this.mode === 'province-city-district') {
          return [this.provinceVal, this.cityVal, this.districtVal];
        } else {
          return [this.provinceVal, this.cityVal];
        }
      } else {
        return undefined;
      }
    },
    updater() {
      return this.selected && `${this.selected.join(',')}|${this.mode}|${this.mapLevels}|${this.valueFormat}`;
    },
    dataUpdater() {
      if(this.mapLevels) {
        const data = this.data;
        if(this.mode === 'province-city-district') {
          return `${data[this.provinceKey]}|${data[this.cityKey]}|${data[this.districtKey]}`;
        } else {
          return `${data[this.provinceKey]}|${data[this.cityKey]}`;
        }
      } else {
        const data = this.data[this.field.name];
        return data && data.join('|');
      }
    }
  },
  watch: {
    updater() {
      this.$set(this.data, this.provinceKey, this.provinceVal);
      this.$set(this.data, this.cityKey, this.cityVal);
      this.$set(this.data, this.districtKey, this.districtVal);
      this.$set(this.data, this.field.name, this.arrayVal);
    },
    provinceKey(val, oldVal) {
      if(oldVal) {
        this.$set(this.data, oldVal, undefined);
      }
      if(this.mapLevels) {
        this.$set(this.data, val, this.selected[0]);
      }
    },
    cityKey(val, oldVal) {
      if(oldVal) {
        this.$set(this.data, oldVal, undefined);
      }
      if(this.mapLevels) {
        this.$set(this.data, val, this.selected[1]);
      }
    },
    districtKey(val, oldVal) {
      if(oldVal) {
        this.$set(this.data, oldVal, undefined);
      }
      if(this.mapLevels) {
        this.$set(this.data, val, this.selected[2]);
      }
    },
    dataUpdater: {
      handler() {
        if(this.mapLevels) {
          const selected = [];

          let province = this.data[this.provinceKey];
          if(province) {
            if(this.valueFormat === 'name') {
              selected.push(TextToCode[province].code);
            } else {
              selected.push(province);
            }
          } else {
            this.selected = undefined;
            return;
          }

          let city = this.data[this.cityKey];
          if(city) {
            if(this.valueFormat === 'name') {
              selected.push(TextToCode[province][city].code);
            } else {
              selected.push(city);
            }
          } else {
            this.selected = undefined;
            return;
          }

          if(this.mode === 'province-city-district') {
            let district = this.data[this.districtKey];
            if(district) {
              if(this.valueFormat === 'name') {
                selected.push(TextToCode[province][city][district].code);
              } else {
                selected.push(district);
              }
            } else {
              this.selected = undefined;
              return;
            }
          }

          this.selected = selected;
        } else {
          let selected = this.data[this.field.name];
          if(this.valueFormat === 'name') {
            let data = TextToCode;
            this.selected = selected.map(v => {
              data = data[v];
              return data.code;
            });
          } else {
            this.selected = selected;
          }
        }
      },
      immediate: true,
    }
  }
};
</script>
