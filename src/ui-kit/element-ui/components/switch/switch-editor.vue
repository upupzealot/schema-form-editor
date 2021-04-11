<template>
  <SSwitch
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import editorItemMixin from '@/framework/common/editor-item/mixin'

import Switch from './switch'

export default {
  type: 'switch',
  components: {
    SSwitch: Switch,
  },
  mixins: [editorItemMixin],
}
</script>
