<template>
  <Draggable
    ref="draggable"
    :list="list"
    :item-key="itemKey"
    :handle="handle"
    :group="componentGroup"
    :clone="clone"
    :sort="sortable"
    v-bind="options"
    class="draggable-list"
    :tag="listTag"
    :component-data="listData"
    @add="addItem"
    @end="selectItem"
  >
    <!-- <slot v-bind="{ list }" /> -->
    <template #item="{ element, index }">
      <component
        :is="itemTag"
        v-bind="getItemData(itemData, element)"
      >
        <slot
          name="item"
          v-bind="{ item: element, index }"
        />
      </component>
    </template>
    <template v-slot:footer>
      <slot name="footer" />
    </template>
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
import Draggable from 'vuedraggable4';

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
    itemKey: {
      type: String,
      default() {
        return '';
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
    listTag: {
      type: String,
      default() { return 'div' },
    },
    listData: {
      type: Object,
      default() { return {} },
    },
    itemTag: {
      type: String,
      default() { return 'div' },
    },
    itemData: {
      type: [Object, Function],
      default() { return {} },
    }
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
    getItemData(item, element) {
      if(_.isFunction(item)) {
        return item(element);
      } else {
        return item;
      }
    },
    addItem({ item, newIndex }) {
      const newItem = item.querySelector('.draggable-list-item').$vm.item;
      this.$emit('add', { item: newItem, index: newIndex });
    },
    selectItem({ from, to, newIndex }) {
      if(!this.selectable) {
        return false;
      }

      if(to === this.$el) {
        const item = this.list[newIndex];
        this.current = item;
        this.$emit('select', item);
      }
    }
  }
}
</script>
