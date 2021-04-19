<template>
  <SSwitch
    :formConf="formConf"
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'

import Switch from './switch'

export default {
  type: 'switch',
  components: {
    SSwitch: Switch,
  },
  mixins: [editorItemMixin],
}
</script>
