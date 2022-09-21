import itemListMixin from '../../../common/components/item-list-mixin'

export default {
  ...itemListMixin,
  computed: {
    ...itemListMixin.computed,
    sortIcon() {
      if(!this.field.sortIcon) {
        return 'swap';
      } else {
        return this.field.sortIcon['ant-design'] || 'swap';
      }
    },
    deleteIcon() {
      if(!this.field.deleteIcon) {
        return 'close';
      } else {
        return this.field.deleteIcon['ant-design'] || 'close';
      }
    },
    addIcon() {
      if (this.deleteIcon === 'close') {
        return 'plus';
      }
      const solidMap = {
        'close-circle-filled': 1,
        'delete-filled': 1
      };
      if (solidMap[this.deleteIcon]) {
        return 'plus-circle-filled';
      }
      return 'plus-circle';
    },
  }
}
