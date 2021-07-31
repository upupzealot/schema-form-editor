<template>
  <span>
    {{ field.label }}
    <a-tooltip
      v-if="hasTooltip"
      placement="topLeft"
    >
      <component
        :is="isVue2 ? 'a-icon' : ExclamationCircleOutlined"
        type="exclamation-circle"
      />
      <template v-slot:title>
        <span v-html="content" />
      </template>
    </a-tooltip>
  </span>
</template>

<script>
import isVue2 from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    ExclamationCircleOutlined,
  },
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
    hasTooltip() {
      return !!this.field.desc;
    },
    content() {
      return this.field.desc && this.field.desc.replace(/\n/g, '<br>');
    }
  }
}
</script>
