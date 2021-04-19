<template>
  <Blank
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

import Blank from './blank'

export default {
  type: 'blank',
  components: {
    Blank,
  },
  mixins: [editorItemMixin],
}
</script>
