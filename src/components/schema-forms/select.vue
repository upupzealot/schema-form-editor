<template>
  <StandardForm>
    <template slot="basic">
      <el-form-item
        label="占位符"
        prop="placeholder"
      >
        <el-input
          v-model="field.placeholder"
        />
      </el-form-item>
      <OptionList
        :field="field"
        class="schema-form"
      />
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
        label="可多选"
        prop="multiple"
        active-text="是"
        inactive-text="否"
      >
        <el-switch
          v-model="field.multiple"
        />
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import standard from './standard-mixin';
import OptionList from './option-list';

export default {
  components: {
    OptionList,
  },
  mixins: [standard],
};
</script>
