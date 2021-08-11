<template>
  <SSlot
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  >
    <template
      v-slot:[field.slotName]
    >
      <div class="blank">
        &lt; 插槽 {{ field.slotName }} &gt;
      </div>
    </template>
  </SSlot>
</template>

<script>
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'

import SSlot from './slot'

export default {
  type: 'slot',
  components: {
    SSlot
  },
  mixins: [editorItemMixin],
}
</script>
