<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'slot': true, 'form-item': true, 'readonly': readonly}"
    :style="{ marginBottom: colMarginY }"
    :sfr-f="field.name"
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
    />
  </el-form-item>
</template>

<style>
.slot .blank {
  width: 100%;
  height: 40px;
  color: #ccc;
  text-align: center;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
