import itemListMixin from '../../../common/components/item-list-mixin'

export default {
  ...itemListMixin,
  computed: {
    ...itemListMixin.computed,
    sortIcon() {
      if(!this.field.sortIcon) {
        return 'el-icon-sort';
      } else {
        return this.field.sortIcon['element-ui'] || 'el-icon-sort';
      }
    },
    deleteIcon() {
      if(!this.field.deleteIcon) {
        return 'el-icon-close';
      } else {
        return this.field.deleteIcon['element-ui'] || 'el-icon-close';
      }
    },
    addIcon() {
      if (this.deleteIcon === 'el-icon-close') {
        return 'el-icon-plus';
      }
      const solidMap = {
        'el-icon-error': 1,
        'el-icon-delete-solid': 1
      };
      if (solidMap[this.deleteIcon]) {
        return 'el-icon-circle-plus';
      }
      return 'el-icon-circle-plus-outline';
    },
  }
}
