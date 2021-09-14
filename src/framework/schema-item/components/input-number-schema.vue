<template>
  <StandardForm>
    <template v-slot:basic>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="最小值"
            prop="min"
          >
            <el-input-number
              v-model="min"
              :controls="false"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="最大值"
            prop="max"
          >
            <el-input-number
              v-model="max"
              :controls="false"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- ant-design-vue 下不支持是否显示控制按钮的设置 -->
      <el-row v-if="uiKit === 'element-ui'">
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
              两侧
            </el-radio>
            <el-radio
              v-model="controlPosition"
              label="right"
            >
              右侧
            </el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="步长"
            prop="step"
          >
            <el-input-number
              v-model="step"
              :controls="false"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <!-- ant-design-vue 下不支持严格步进的设置 -->
        <el-col :span="12" v-if="uiKit === 'element-ui'">
          <el-form-item
            label="严格步进"
            prop="step-only"
          >
            <el-switch
              v-model="stepOnly"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="精度"
            prop="precision"
          >
            <el-input-number
              v-model="precision"
              controls-position="right"
              :min="0"
              :max="100"
              :step="1"
              step-strictly
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label="文本对齐"
            prop="textAlign"
          >
            <el-radio-group
              v-model="textAlign"
              style="width: 100%;"
              class="text-align-radio-group"
            >
              <el-radio-button label="left">
                左
              </el-radio-button>
              <el-radio-button label="center">
                中
              </el-radio-button>
              <el-radio-button label="right">
                右
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <Placeholder />
    </template>

    <!-- 校验 -->
    <template v-slot:valid>
      <FuncValidate />
    </template>
  </StandardForm>
</template>

<style>
.el-radio-group.text-align-radio-group {
  width: 100%;
  display: flex;
}
.el-radio-group.text-align-radio-group .el-radio-button {
  flex: 1 1 auto;
}
.el-radio-group.text-align-radio-group .el-radio-button__inner {
  width: 100%;
}
</style>

<script>
import _ from 'lodash';

import schemaItemMixin from '@/framework/schema-item/mixin';
import Placeholder from '@/framework/schema-item/common/placeholder'
import FuncValidate from '@/framework/schema-item/common/validate-rules/func'

export default {
  type: 'input-number',
  mixins: [schemaItemMixin],
  components: {
    Placeholder,
    FuncValidate
  },
  computed: {
    min: {
      get() {
        const min = Number(this.field.min);
        return isNaN(min) ? undefined : min;
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
        this.$set(this.field, 'step', (isNaN(number) || number === 1) ? undefined : number);
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
    textAlign: {
      get() {
        return this.field.textAlign || 'center';
      },
      set(textAlign) {
        this.$set(this.field, 'textAlign', textAlign === 'center' ? undefined : textAlign); 
      }
    },
  },
};
</script>
