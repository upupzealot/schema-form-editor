<template>
  <span>
    {{ field.label }}
    <el-tooltip
      v-if="hasTooltip"
      placement="top-start"
    >
      <template v-if="hasTooltip">
        <i
          v-if="isVue2"
          class="el-icon-warning-outline"
        />
        <el-icon
          v-else
          :size="14"
        >
          <Warning />
        </el-icon>
      </template>
      <template v-slot:content>
        <span v-html="content" />
      </template>
    </el-tooltip>
  </span>
</template>

<script>
import isVue2 from '../../common/util-is-vue2';

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
      isVue2,
    };
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
