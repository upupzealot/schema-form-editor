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
      <el-row>
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
      <el-form-item
        label="占位符"
        prop="placeholder"
      >
        <el-input
          v-model="field.placeholder"
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
import schemaItemMixin from '@/ui-kit/common/schema-item/mixin';

import RegexpValidate from '@/ui-kit/common/schema-item/validate-rules/regexp'
import FuncValidate from '@/ui-kit/common/schema-item/validate-rules/func'

export default {
  type: 'input',
  components: {
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
    rules: {
      get() {
        return this.field.rules || [];
      },
      set(rules) {
        if(rules.length) {
          this.$set(this.field, 'rules', rules);
        } else {
          this.$set(this.field, 'rules', undefined);
        }
      }
    },
  },
};
</script>
