<template>
  <StandardForm>
    <template v-slot:basic>
      <OptionList
        :field="field"
        class="schema-form"
      />
      <el-form-item
        label="组件模式"
        prop="schema-form"
      >
        <el-radio
          v-model="mode"
          label="radio"
        >
          默认
        </el-radio>
        <el-radio
          v-if="uiKit === 'element-ui'"
          v-model="mode"
          label="border"
        >
          带有边框
        </el-radio>
        <el-radio
          v-model="mode"
          label="button"
        >
          按钮组
        </el-radio>
        <el-radio
          v-if="uiKit === 'ant-design'"
          v-model="mode"
          label="border-button"
        >
          边框按钮组
        </el-radio>
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';
import OptionList from '@/framework/schema-item/common/option-list';

export default {
  type: 'radio',
  components: {
    OptionList,
  },
  mixins: [schemaItemMixin],
  computed: {
    mode: {
      get() {
        return this.field.mode || 'radio';
      },
      set(mode) {
        this.$set(this.field, 'mode', mode === 'radio' ? undefined : mode);
      }
    },
  }
};
</script>
