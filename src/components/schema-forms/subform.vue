<template>
  <StandardForm :config="{ hasDesc: false, hasValid: false }" />
</template>

<script>
import standard from './standard-mixin';

export default {
  mixins: [standard],
};
</script>
