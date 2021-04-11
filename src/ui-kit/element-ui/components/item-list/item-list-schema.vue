<template>
  <StandardForm :config="{ hasValid: false }" />
</template>

<script>
import schemaItemMixin from '@/framework/common/schema-item/mixin';

export default {
  type: 'item-list',
  mixins: [schemaItemMixin],
};
</script>
