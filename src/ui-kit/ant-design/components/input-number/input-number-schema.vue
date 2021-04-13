<template>
  <StandardForm>
    <template v-slot:basic>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="最小值"
            prop="min"
          >
            <el-input
              v-model.number="min"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="最大值"
            prop="max"
          >
            <el-input
              v-model.number="max"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item
            label="控制按钮"
            prop="hasControl"
          >
            <el-switch
              v-model="hasControl"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="按钮位置"
            prop="controlPosition"
          >
            <el-radio
              v-model="controlPosition"
              label=""
            >
              左右
            </el-radio>
            <el-radio
              v-model="controlPosition"
              label="right"
            >
              右侧
            </el-radio>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="步长"
            prop="step"
          >
            <el-input
              v-model.number="step"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item
            label="严格步进"
            prop="step-only"
          >
            <el-switch
              v-model="stepOnly"
            />
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item
            label="精度"
            prop="precision"
          >
            <el-input-number
              v-model.number="precision"
              controls-position="right"
              :min="0"
              :max="100"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item
        label="占位符"
        prop="placeholder"
      >
        <el-input
          v-model="field.placeholder"
        />
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import _ from 'lodash';
import schemaItemMixin from '@/ui-kit/common/schema-item/mixin';

export default {
  type: 'input-number',
  mixins: [schemaItemMixin],
  computed: {
    min: {
      get() {
        return this.field.min || undefined;
      },
      set(val) {
        const number = Number(val);
        this.$set(this.field, 'min', isNaN(number) ? undefined : number);
      }
    },
    max: {
      get() {
        return this.field.max || undefined;
      },
      set(val) {
        const number = Number(val);
        this.$set(this.field, 'max', isNaN(number) ? undefined : number);
      }
    },
    step: {
      get() {
        return this.field.step || 1;
      },
      set(val) {
        const number = Number(val);
        this.$set(this.field, 'step', isNaN(number) ? undefined : number);
      }
    },
    stepOnly: {
      get() {
        return !!this.field.stepOnly;
      },
      set(val) {
        this.$set(this.field, 'stepOnly', val ? true : undefined);
      }
    },
    hasControl: {
      get() {
        return this.field.hasControl !== false;
      },
      set(hasControl) {
        this.$set(this.field, 'hasControl', hasControl !== false ? undefined : false); 
      }
    },
    controlPosition: {
      get() {
        return this.field.controlPosition || '';
      },
      set(position) {
        this.$set(this.field, 'controlPosition', position || undefined); 
      }
    },
    precision: {
      get() {
        return this.field.precision;
      },
      set(precision) {
        const precisionNum = Number(precision);
        this.$set(this.field, 'precision', isNaN(precisionNum) ? undefined : precisionNum); 
      }
    },
  },
};
</script>
