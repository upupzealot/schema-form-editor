<template>
  <div
    :class="{'draggable-list-item': true, 'active': active}"
    @click.stop="onSelect"
  >
    <div
      v-if="hasControl"
      class="control drag drag-handle"
    >
      <slot
        name="sortIcon"
      >
        <i
          v-if="isVue2"
          :class="[sortIcon]"
        />
        <el-icon
          v-else
          :size="14"
        >
          <component
            :is="sortIcon"
          />
        </el-icon>
      </slot>
    </div>

    <slot />

    <div
      v-if="hasControl"
      class="control close"
    >
      <slot
        name="deleteIcon"
        v-bind="{ onDelete }"
      >
        <i
          v-if="isVue2"
          :class="[deleteIcon]"
          @click="onDelete"
        />
        <el-icon
          v-else
          :size="14"
        >
          <component
            :is="deleteIcon"
            @click="onDelete"
          />
        </el-icon>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.draggable-list .draggable-list-item .slot-content {
  flex-grow: 1;
  flex-shrink: 1;
}
.draggable-list .draggable-list-item .control {
  flex-grow: 0;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.draggable-list .draggable-list-item .control.drag {
  height: 40px;
  width: 40px;
  line-height: 40px;
}
.draggable-list .draggable-list-item .control.close {
  margin-left: 5px;
  cursor: pointer;
}
.draggable-list .draggable-list-item .control.close :hover {
  color: #F56C6C;
}
.draggable-list .draggable-list-item .el-form-item__label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.draggable-list .draggable-list-item .drag-handle {
  line-height: 40px;
  cursor: move;
}
</style>

<script>
import isVue2 from './util-is-vue2';

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    hasControl: {
      type: Boolean,
      default() {
        return true;
      }
    },
    sortIcon: {
      type: String,
      default() {
        return isVue2 ? 'el-icon-sort' : 'Sort';
      }
    },
    deleteIcon: {
      type: String,
      default() {
        return isVue2 ? 'el-icon-close' : 'Close';
      }
    },
    active: {
      type: Boolean,
      default() {
        return false;
      },
    }
  },
  data() {
    return {
      isVue2
    };
  },
  mounted() {
    this.$el.$vm = this;
  },
  methods: {
    onSelect() {
      this.$emit('select', this.item);
    },
    onDelete() {
      this.$emit('delete', this.item);
    }
  }
}
</script>
