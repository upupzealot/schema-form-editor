import isVue2 from '../../../common/util-is-vue2'
import itemListMixin from '../../../common/components/item-list-mixin'

export default {
  ...itemListMixin,
  computed: {
    ...itemListMixin.computed,
    sortIcon() {
      const defaultIcon = isVue2 ? 'el-icon-sort' : 'Sort';
      if(!this.field.sortIcon) {
        return defaultIcon;
      } else {
        return this.field.sortIcon['element-ui'] || defaultIcon;
      }
    },
    deleteIcon() {
      const defaultIcon = isVue2 ? 'el-icon-close' : 'Close';
      if(!this.field.deleteIcon) {
        return defaultIcon;
      } else {
        return this.field.deleteIcon['element-ui'] || defaultIcon;
      }
    },
  }
}
