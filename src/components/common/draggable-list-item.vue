<template>
  <div
    :class="{'draggable-list-item': true, 'active': active}"
    @click.stop="onSelect"
  >
    <div
      v-if="hasControl"
      class="control drag drag-handle"
    >
      <i class="el-icon-sort" />
    </div>

    <slot />

    <div
      v-if="hasControl"
      class="control close"
    >
      <i
        class="el-icon-close"
        @click="onDelete"
      />
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
.draggable-list .draggable-list-item .control.close .el-icon-close:hover {
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
    active: {
      type: Boolean,
      default() {
        return false;
      },
    }
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
