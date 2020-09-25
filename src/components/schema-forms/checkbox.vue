<template>
  <el-row class="schema-form">
    <el-col>
      <OptionList :field="field" />
    </el-col>
  </el-row>
</template>

<script>
import OptionList from './option-list';

export default {
  components: {
    OptionList,
  },
  props: {
    field: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
