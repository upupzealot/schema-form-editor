import isVue2 from '../../../common/util-is-vue2'
import itemListMixin from '../../../common/components/item-list-mixin'

export default {
  ...itemListMixin,
  computed: {
    ...itemListMixin.computed,
    sortIcon() {
      if(!this.field.sortIcon) {
        return isVue2 ? 'el-icon-sort' : 'Sort';
      } else {
        return this.field.sortIcon['element-ui'] || isVue2 ? 'el-icon-sort' : 'Sort';
      }
    },
    deleteIcon() {
      if(!this.field.deleteIcon) {
        return isVue2 ? 'el-icon-close' : 'Close';
      } else {
        return this.field.deleteIcon['element-ui'] || isVue2 ? 'el-icon-close' : 'Close';
      }
    },
  }
}
