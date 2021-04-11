<template>
  <StandardForm :config="{ hasBasic: false, hasValid: false }" />
</template>

<script>
import schemaItemMixin from '@/framework/common/schema-item/mixin';

export default {
  type: 'blank',
  mixins: [schemaItemMixin],
};
</script>
