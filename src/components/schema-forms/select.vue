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
