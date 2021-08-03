<template>
  <span>
    {{ field.label }}
    <a-tooltip
      v-if="hasTooltip"
      placement="topLeft"
      :get-popup-container="getPopupContainer"
      :destroy-tooltip-on-hide="true"
    >
      <component
        :is="iconComponent"
        type="exclamation-circle"
      />
      <template
        v-slot:title
        ref="labelRoot"
      >
        <span v-html="content" />
      </template>
    </a-tooltip>
  </span>
</template>

<script>
import isVue2 from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default {
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      isVue2: !!isVue2,
    }
  },
  computed: {
    iconComponent() {
      return !!isVue2 ? 'a-icon' : ExclamationCircleOutlined;
    },
    hasTooltip() {
      return !!this.field.desc;
    },
    getPopupContainer() {
      console.log(this)
      return this.$refs['labelRoot'];
    },
    content() {
      return this.field.desc && this.field.desc.replace(/\n/g, '<br>');
    }
  }
}
</script>
