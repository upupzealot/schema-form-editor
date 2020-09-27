<template>
  <el-row>
    <el-col class="item-editor">
      <el-divider content-position="left">
        <i
          :class="{ 'el-icon-circle-plus-outline': !formConfOpen, 'el-icon-remove-outline': formConfOpen }"
          @click="formConfOpen = !formConfOpen"
        />
        表单属性
      </el-divider>
      <el-collapse-transition>
        <div
          v-show="formConfOpen"
          class="field-group"
        >
          <FormConfEditor />
        </div>
      </el-collapse-transition>
      <el-form label-width="80px">
        <div class="divider-wrap">
          <el-divider content-position="left">
            <i
              :class="{ 'el-icon-circle-plus-outline': !basicOpen, 'el-icon-remove-outline': basicOpen }"
              @click="basicOpen = !basicOpen"
            />
            表单项属性
          </el-divider>
        </div>
        <el-collapse-transition>
          <div
            v-show="basicOpen"
            class="field-group"
          >
            <el-form-item label="Key">
              <el-input v-model="field.name" />
            </el-form-item>
            <el-form-item label="标签">
              <el-input v-model="field.label" />
            </el-form-item>
          </div>
        </el-collapse-transition>

        <div class="divider-wrap">
          <el-divider content-position="left">
            <i
              :class="{ 'el-icon-circle-plus-outline': !layoutOpen, 'el-icon-remove-outline': layoutOpen }"
              @click="layoutOpen = !layoutOpen"
            />
            布局
          </el-divider>
        </div>
        <el-collapse-transition>
          <div
            v-show="layoutOpen"
            class="field-group"
          >
            <el-form-item label="栅格数">
              <el-input
                v-model="span"
                placeholder="1~24 之间，24 不用填"
              />
            </el-form-item>
          </div>
        </el-collapse-transition>

        <div class="divider-wrap">
          <el-divider content-position="left">
            <i
              :class="{ 'el-icon-circle-plus-outline': !validOpen, 'el-icon-remove-outline': validOpen }"
              @click="validOpen = !validOpen"
            />
            校验
          </el-divider>
        </div>
        <el-collapse-transition>
          <div
            v-show="validOpen"
            class="field-group"
          >
            <el-form-item label="必填">
              <el-switch v-model="field.required" />
            </el-form-item>
          </div>
        </el-collapse-transition>

        <SelectForm
          v-if="field.type === 'select'"
          :field="field"
        />
        <RadioForm
          v-if="field.type === 'radio'"
          :field="field"
        />
        <CheckboxForm
          v-if="field.type === 'checkbox'"
          :field="field"
        />
        <SSwitchForm
          v-if="field.type === 'switch'"
          :field="field"
        />
        <DatePickerForm
          v-if="field.type === 'date-picker'"
          :field="field"
        />
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.field-group .el-form-item:last-child {
  margin: 0;
}
.item-editor .divider-wrap {
  padding: 1px;
}
.item-editor .el-divider__text {
  color: #ccc;
}
.el-divider .el-divider__text i {
  cursor: pointer;
  margin-right: 5px;
}
.el-divider .el-divider__text i:hover {
  color: #409EFF;
}
</style>

<script>
import FormConfEditor from '@/components/form-conf-editor';

import SelectForm from '@/components/schema-forms/select';
import RadioForm from '@/components/schema-forms/radio';
import CheckboxForm from '@/components/schema-forms/checkbox';
import SSwitchForm from '@/components/schema-forms/switch';
import DatePickerForm from '@/components/schema-forms/date-picker';

const spanValues = Array.from({ length: 23 }, (v, i) => i + 1);

export default {
  components: {
    FormConfEditor,
    SelectForm,
    RadioForm,
    CheckboxForm,
    SSwitchForm,
    DatePickerForm,
  },
  data() {
    return {
      formConfOpen: true,
      basicOpen: true,
      layoutOpen: true,
      validOpen: true,
    }
  },
  computed: {
    field() {
      return this.$store.state.activeField;
    },
    span: {
      get() {
        return this.field.span;
      },
      set(n) {
        const value = Number(n);
        this.$set(this.field, 'span', spanValues.includes(value) ? value : undefined);
      }
    }
  },
};
</script>
