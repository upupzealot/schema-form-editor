<template>
  <Draggable
    :list="list"
    :handle="handle"
    :group="componentGroup"
    :clone="clone"
    :sort="sortable"
    v-bind="options"
    class="draggable-list"
    @add="selectItem"
    @end="selectItem"
  >
    <slot />
  </Draggable>
</template>

<style>
.draggable-list .el-form-item {
  margin-bottom: 0;
}
.draggable-list .draggable-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;

  border: 1px dashed #eee;
  margin-bottom: 15px;
  padding: 10px 5px 10px 0;
}
.draggable-list .draggable-list-item.active {
  border: 1px dashed #999;
  background-color: #f0f9ff;
}
</style>

<script>
import _ from 'lodash';
import Draggable from 'vuedraggable';

export default {
  components: {
    Draggable,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    selectable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    sortable: {
      type: Boolean,
      default() {
        return true;
      }
    },
    handle: {
      type: String,
      default() {
        return '.draggable-list-item .drag-handle';
      }
    },
    options: {
      type: Object,
      default() {
        return {
          animation: 200,
          disabled: false,
        };
      }
    },
    group: {
      type: Object,
      default() {
        return {
          put: false,
          push: false,
        }
      }
    },
    clone: {
      type: Function,
      default() {},
    },
  },
  data() {
    return {
      current: null,
    }
  },
  computed: {
    componentGroup() {
      return _.merge({
        put: false,
        pull: false,
      }, this.group);
    }
  },
  methods: {
    selectItem({ newIndex }) {
      if(!this.selectable) {
        return false;
      }

      const item = this.list[newIndex];
      this.current = item;
      this.$emit('select', item);
    }
  }
}
</script>
