<template>
  <StandardForm>
    <template v-slot:basic>
      <el-form-item
        label="占位符"
        prop="placeholder"
      >
        <el-input
          v-model="field.placeholder"
        />
      </el-form-item>
      
      <el-form-item
        label="层级"
        prop="level"
      >
        <el-radio
          v-model="mode"
          label="province-city"
        >
          省市
        </el-radio>
        <el-radio
          v-model="mode"
          label="province-city-district"
        >
          省市区
        </el-radio>
      </el-form-item>

      <el-form-item
        label="传值格式"
        prop="provinceKey"
      >
        <el-switch
          v-model="valueFormat"
          active-text="名称"
          active-value="name"
          inactive-text="编号"
          inactive-value="code"
        />
      </el-form-item>

      <el-form-item
        label="字段映射"
        prop="mapLevels"
      >
        <el-switch
          v-model="mapLevels"
          active-text="所选值映射到独立的字段"
        />
      </el-form-item>
      <template v-if="mapLevels">
        <el-form-item
          label="省级字段"
          prop="provinceKey"
        >
          <el-input
            v-model="provinceKey"
            placeholder="province"
          />
        </el-form-item>
        <el-form-item
          label="市级字段"
          prop="cityKey"
        >
          <el-input
            v-model="cityKey"
            placeholder="city"
          />
        </el-form-item>
        <el-form-item
          v-if="mode === 'province-city-district'"
          label="区级字段"
          prop="districtKey"
        >
          <el-input
            v-model="districtKey"
            placeholder="district"
          />
        </el-form-item>
      </template>

      <el-form-item
        label="可清空"
        prop="clearable"
        active-text="是"
        inactive-text="否"
      >
        <el-switch
          v-model="field.clearable"
        />
      </el-form-item>
      <el-form-item
        label="可搜索"
        prop="filterable"
        active-text="是"
        inactive-text="否"
      >
        <el-switch
          v-model="field.filterable"
        />
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';

export default {
  type: 'china-region',
  mixins: [schemaItemMixin],
  data() {
    return {
      provinceStr: '',
      cityStr: '',
      districtStr: '',
    };
  },
  computed: {
    mode: {
      get() {
        return this.field.mode || 'province-city-district';
      },
      set(val) {
        const mode = val === 'province-city-district' ? undefined : val;
        this.$set(this.field, 'mode', mode);
      }
    },
    valueFormat: {
      get() {
        return this.field.valueFormat || 'code';
      },
      set(val) {
        const valueFormat = val === 'code' ? undefined : val;
        this.$set(this.field, 'valueFormat', valueFormat);
      }
    },
    mapLevels: {
      get() {
        return !!this.field.mapLevels;
      },
      set(val) {
        this.$set(this.field, 'mapLevels', val || undefined);
      }
    },
    provinceKey: {
      get() {
        return this.field.provinceKey || 'province';
      },
      set(val) {
        if(val) {
          this.provinceStr = val;
        }
        this.$set(this.field, 'provinceKey',
          (!val || val === 'province') ? undefined : val);
      }
    },
    cityKey: {
      get() {
        return this.field.cityKey || 'city';
      },
      set(val) {
        if(val) {
          this.cityStr = val;
        }
        this.$set(this.field, 'cityKey',
          (!val || val === 'city') ? undefined : val);
      }
    },
    districtKey: {
      get() {
        return this.field.districtKey || 'district';
      },
      set(val) {
        if(val) {
          this.districtStr = val;
        }
        this.$set(this.field, 'districtKey',
          (!val || val === 'district') ? undefined : val);
      }
    },
    filterable: {
      get() {
        return this.field.mode !== false;
      },
      set(val) {
        this.$set(this.field, 'filterable', val ? undefined : false);
      }
    }
  },
  watch: {
    mode(val) {
      if(val === 'province-city-district') {
        if(this.mapLevels) {
          this.$set(this.field, 'districtKey', this.districtStr || undefined);
        }
      } else {
        this.$set(this.field, 'districtKey', undefined);
      }
    },
    mapLevels(val) {
      if(val) {
        this.$set(this.field, 'provinceKey', this.provinceStr || undefined);
        this.$set(this.field, 'cityKey', this.cityStr || undefined);
        if(this.mode === 'province-city-district') {
          this.$set(this.field, 'districtKey', this.districtStr || undefined);
        }
      } else {
        this.$set(this.field, 'provinceKey', undefined);
        this.$set(this.field, 'cityKey', undefined);
        this.$set(this.field, 'districtKey', undefined);
      }
    },
  }
};
</script>
