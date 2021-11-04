<template>
  <StandardForm>
    <template v-slot:basic>
      <Placeholder />
      <OptionList
        :field="field"
        class="schema-form"
      />
      <Clearable />
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
      <el-form-item
        label="可搜索"
        prop="searchable"
        active-text="是"
        inactive-text="否"
      >
        <el-switch
          v-model="field.searchable"
        />
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';
import OptionList from '@/framework/schema-item/common/option-list';

import Clearable from '@/framework/schema-item/common/clearable'
import Placeholder from '@/framework/schema-item/common/placeholder'

export default {
  type: 'select',
  components: {
    OptionList,
    Clearable,
    Placeholder
  },
  mixins: [schemaItemMixin],
};
</script>
