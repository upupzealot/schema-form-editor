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
          :class="[sortIcon]"
        />
      </slot>
    </div>

    <slot />

    <div
      v-if="hasControl && hasDelete"
      class="control close"
    >
      <slot
        name="deleteIcon"
        v-bind="{ onDelete }"
      >
        <i
          :class="[deleteIcon]"
          @click="onDelete"
        />
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
.draggable-list .draggable-list-item .control.add,
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
    hasDelete: {
      type: Boolean,
      default() {
        return true;
      }
    },
    sortIcon: {
      type: String,
      default() {
        return 'el-icon-sort';
      }
    },
    deleteIcon: {
      type: String,
      default() {
        return 'el-icon-close';
      }
    },
    active: {
      type: Boolean,
      default() {
        return false;
      },
    }
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
