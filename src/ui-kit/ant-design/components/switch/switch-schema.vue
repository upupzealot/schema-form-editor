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
            <el-input v-model="activeValue" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关-键">
            <el-input v-model="field.inactiveText" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关-值">
            <el-input v-model="inactiveValue" />
          </el-form-item>
        </el-col>
      </el-row>
    </template>
  </StandardForm>
</template>

<script>
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
        this.setValue('activeValue');
        this.setValue('inactiveValue');
      }
    },
    activeValue: {
      get() {
        return `${this.field.activeValue}`
      },
      set(val) {
        this.setValue('activeValue', val);
      }
    },
    inactiveValue: {
      get() {
        return `${this.field.inactiveValue}`
      },
      set(val) {
        this.setValue('inactiveValue', val);
      }
    },
  },
  methods: {
    setValue(key, val) {
      if (this.field.typeValue) {
        this.$set(this.field, key, val || this.transValue(this.field[key]));
      } else {
        this.$set(this.field, key, `${val || this.field[key]}`);
      }
    },
    transValue(val) {
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
