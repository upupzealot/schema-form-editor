<template>
  <StandardForm>
    <template v-slot:basic>
      <el-form-item
        label="组件模式"
        prop="schema-form"
      >
        <el-radio
          v-model="mode"
          label="text"
        >
          单行文本
        </el-radio>
        <el-radio
          v-model="mode"
          label="password"
        >
          密码框
        </el-radio>
        <el-radio
          v-model="mode"
          label="textarea"
        >
          多行文本
        </el-radio>
      </el-form-item>
      <el-row v-if="mode !== 'textarea'">
        <el-col :span="12">
          <el-form-item
            label="前复合"
            prop="prepend"
          >
            <el-input
              v-model="prepend"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="后复合"
            prop="append"
          >
            <el-input
              v-model="append"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <Clearable v-if="mode !== 'textarea'" />
      <Placeholder />
      <el-form-item
        v-if="mode === 'textarea'"
        label="自适高度"
        prop="autosize"
      >
        <el-switch
          v-model="autosize"
        />
      </el-form-item>
      <el-row v-if="autosize">
        <el-col :span="12">
          <el-form-item
            label="最小行数"
            prop="prepend"
          >
            <el-input-number
              v-model="minRows"
              :min="2"
              :max="maxRows"
              :step-strictly="true"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="最大行数"
            prop="append"
          >
            <el-input-number
              v-model="maxRows"
              :min="minRows || 1"
              :step-strictly="true"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="字数统计"
        prop="wordLimit"
      >
        <el-switch
          v-model="wordLimit"
        />
      </el-form-item>
      <el-form-item
        v-if="wordLimit"
        label="最大长度"
        prop="wordLimit"
      >
        <el-input-number
          v-model="maxLength"
          :min="0"
          :step-strictly="true"
          placeholder="50"
          style="width: 100%"
        />
      </el-form-item>
    </template>

    <!-- 校验 -->
    <template v-slot:valid>
      <RegexpValidate />
      <FuncValidate />
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';

import Clearable from '@/framework/schema-item/common/clearable'
import Placeholder from '@/framework/schema-item/common/placeholder'
import RegexpValidate from '@/framework/schema-item/common/validate-rules/regexp'
import FuncValidate from '@/framework/schema-item/common/validate-rules/func'

export default {
  type: 'input',
  components: {
    Clearable,
    Placeholder,
    RegexpValidate,
    FuncValidate,
  },
  mixins: [schemaItemMixin],
  computed: {
    mode: {
      get() {
        return this.field.isPassword ? 'password' : (this.field.mode || 'text');
      },
      set(mode) {
        this.$set(this.field, 'mode', mode === 'textarea' ? 'textarea' : undefined);
        this.$set(this.field, 'isPassword', mode === 'password' ? true : undefined);
      }
    },
    prepend: {
      get() {
        return this.field.prepend || '';
      },
      set(val) {
        this.$set(this.field, 'prepend', val || undefined);
      }
    },
    append: {
      get() {
        return this.field.append || '';
      },
      set(val) {
        this.$set(this.field, 'append', val || undefined);
      }
    },
    autosize: {
      get() {
        return !!this.field.autosize;
      },
      set(val) {
        this.$set(this.field, 'autosize', val || undefined);
      }
    },
    minRows: {
      get() {
        return this.field.minRows || 2;
      },
      set(val) {
        this.$set(this.field, 'minRows', val === 2 ? undefined : val);
      }
    },
    maxRows: {
      get() {
        return this.field.maxRows || undefined;
      },
      set(val) {
        this.$set(this.field, 'maxRows', val || undefined);
      }
    },
    wordLimit: {
      get() {
        return !!this.field.wordLimit;
      },
      set(val) {
        this.$set(this.field, 'wordLimit', val || undefined);
      }
    },
    maxLength: {
      get() {
        return this.field.maxLength || 50;
      },
      set(val) {
        const length = val === 50 ? undefined : val;
        this.$set(this.field, 'maxLength', length);
      }
    }
  },
  watch: {
    mode(val) {
      if(val !== 'textarea') {
        this.$delete(this.field, 'autosize');
        this.$delete(this.field, 'minRows');
        this.$delete(this.field, 'maxRows');
      }
    },
    autosize(val) {
      if(!val) {
        this.$delete(this.field, 'minRows');
        this.$delete(this.field, 'maxRows');
      }
    },
    wordLimit(val) {
      if(!val) {
        this.$delete(this.field, 'maxLength');
      }
    },
  }
};
</script>
