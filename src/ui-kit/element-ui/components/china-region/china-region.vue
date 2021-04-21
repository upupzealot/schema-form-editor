<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    style="margin-bottom: 0"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-cascader
      size="large"
      :options="options"
      v-model="selected"
      :clearable="field.clearable !== false"
      :filterable="field.filterable"
      style="width: 100%"
    >
    </el-cascader>
  </el-form-item>
</template>

<style>
.form-item.readonly .el-input__suffix-inner {
  pointer-events: none;
}
</style>

<script>
import { provinceAndCityData, regionData } from 'element-china-area-data'

import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  data() {
    return {
      selected: this.data[this.field.name] || [],
    }
  },
  created() {
    if(this.mapLevels) {
      const selected = [];
      selected.push(this.data[this.provinceKey]);
      selected.push(this.data[this.cityKey]);
      if(this.mode === 'province-city-district') {
        selected.push(this.data[this.districtKey]);
      }
      this.selected = selected;
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
  },
  watch: {
    selected(val) {
      if(val && val.length) {
        if(this.mapLevels) {
          this.$set(this.data, this.provinceKey, val[0]);
          this.$set(this.data, this.cityKey, val[1]);
          if(this.mode === 'province-city-district') {
            this.$set(this.data, this.districtKey, val[2]);
          }
        } else {
          this.$set(this.data, this.field.name, val);
        }
      } else {
        if(this.mapLevels) {
          this.$set(this.data, this.provinceKey, undefined);
          this.$set(this.data, this.cityKey, undefined);
          if(this.mode === 'province-city-district') {
            this.$set(this.data, this.districtKey, undefined);
          }
        } else {
          this.$set(this.data, this.field.name, undefined);
        }
      }
    },
    mapLevels(val) {
      if(val) {
        this.$set(this.data, this.field.name, undefined);

        this.$set(this.data, this.provinceKey, this.selected[0]);
        this.$set(this.data, this.cityKey, this.selected[1]);
        if(this.mode === 'province-city-district') {
          this.$set(this.data, this.districtKey, this.selected[2]);
        }
      } else {
        this.$set(this.data, this.field.name, this.selected);

        this.$set(this.data, this.provinceKey, undefined);
        this.$set(this.data, this.cityKey, undefined);
        if(this.mode === 'province-city-district') {
          this.$set(this.data, this.districtKey, undefined);
        }
      }
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
    }
  }
};
</script>
