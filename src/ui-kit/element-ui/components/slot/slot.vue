<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{ marginBottom: colMarginY }"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <div
      v-if="!field.slotName"
      class="blank"
    />
    <slot
      v-if="field.slotName"
      :name="field.slotName"
    >
      <div class="blank" />
    </slot>
  </el-form-item>
</template>

<style>
>>> .blank {
  width: 100%;
  height: 40px;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
