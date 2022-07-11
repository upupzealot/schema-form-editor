<template>
  <StandardForm>
    <template v-slot:basic>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="智能类型">
            <el-switch
              v-model="typeValue"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="开-键">
            <el-input v-model="field.activeText" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开-值">
            <el-input
              v-model="activeValue"
              placeholder="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关-键">
            <el-input v-model="field.inactiveText" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关-值">
            <el-input
              v-model="inactiveValue"
              placeholder="false"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </template>
  </StandardForm>
</template>

<script>
import _ from 'lodash';
import schemaItemMixin from '@/framework/schema-item/mixin';

export default {
  type: 'switch',
  mixins: [schemaItemMixin],
  computed: {
    typeValue: {
      get() {
        return !!this.field.typeValue;
      },
      set(val) {
        this.$set(this.field, 'typeValue', !!val ? true : undefined);
        this.setValue('activeValue', this.activeValue);
        this.setValue('inactiveValue', this.inactiveValue);
      }
    },
    activeValue: {
      get() {
        return `${this.parse(this.field.activeValue, true)}`
      },
      set(val) {
        this.setValue('activeValue', val);
      }
    },
    inactiveValue: {
      get() {
        return `${this.parse(this.field.inactiveValue, false)}`
      },
      set(val) {
        this.setValue('inactiveValue', val);
      }
    },
  },
  methods: {
    parse(val) {
      if (val === '' || _.isNil(val)) {
        return '';
      }
      if(`${val}` === 'true' || `${val}` === 'false') {
        return JSON.parse(val);
      }
      const num = Number(val);
      if (!isNaN(num)) {
        return num;
      }
      return val;
    },
    setValue(key, value = this.field[key]) {
      let val = value;
      if (this.field.typeValue) {
        val =  this.transValue(val);
      } else {
        val =  `${val}`;
      }
      if (val === '' || _.isNil(val)) {
        val = undefined;
      }
      this.$set(this.field, key, val);
    },
    transValue(val) {
      if (val === '') {
        return val;
      }
      if(`${val}` === 'true' || `${val}` === 'false') {
        return JSON.parse(val);
      }
      const numVal = Number(val)
      if(numVal || numVal === 0) {
        return numVal;
      }
      return val;
    },
  }
};
</script>
