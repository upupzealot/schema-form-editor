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
  }
}
