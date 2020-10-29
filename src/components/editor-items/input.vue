<template>
  <Input
    :field="field"
    :data="data"
    :v-status="{}"
    :sup-nodes="supNodes"
    :class="{
      'v-not-activated': !status.activated || !status.visible,
      'v-disbaled': status.disabled,
      'v-readonly': status.readonly,
    }"
  />
</template>

<script>
import standardMixin from './standard-mixin'

import Input from '../form-items/input'

export default {
  components: {
    Input,
  },
  mixins: [standardMixin],
}
</script>
