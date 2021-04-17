<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    label="　"
    :colon="false"
    class="blank-wrap"
    style="margin-bottom: 0;"
  >
    <div class="blank" />
  </component>
</template>

<style>
.blank-wrap .el-form-item__label {
  color: transparent;
  content: none;
  pointer-events: none;
}
.blank-wrap .blank {
  width: 100%;
  height: 40px;
  color: #eee;
}
</style>

<script>
import isVue2 from 'vue';
import formItemMixin from '@/ui-kit/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  computed: {
    formItemIs() {
      return isVue2 ? 'a-form-model-item' : 'a-form-item';
    },
  },
};
</script>
