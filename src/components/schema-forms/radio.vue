<template>
  <StandardForm>
    <template v-slot:basic>
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
