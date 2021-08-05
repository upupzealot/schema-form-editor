<template>
  <StandardForm>
    <!-- 校验 -->
    <template v-slot:valid>
      <RegexpValidate />
      <FuncValidate />
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';

import RegexpValidate from '@/framework/schema-item/common/validate-rules/regexp'
import FuncValidate from '@/framework/schema-item/common/validate-rules/func'

export default {
  type: 'input-ip',
  components: {
    RegexpValidate,
    FuncValidate,
  },
  mixins: [schemaItemMixin],
};
</script>
