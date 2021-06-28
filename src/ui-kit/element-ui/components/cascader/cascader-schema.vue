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
        :force-remote="true"
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
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/ui-kit/common/schema-item/mixin';
import OptionList from '@/ui-kit/common/schema-item/option-list';

export default {
  type: 'cascader',
  components: {
    OptionList,
  },
  mixins: [schemaItemMixin],
};
</script>
