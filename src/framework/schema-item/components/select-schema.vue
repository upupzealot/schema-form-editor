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
import schemaItemMixin from '@/framework/schema-item/mixin';
import OptionList from '@/framework/schema-item/common/option-list';

export default {
  type: 'select',
  components: {
    OptionList,
  },
  mixins: [schemaItemMixin],
};
</script>
