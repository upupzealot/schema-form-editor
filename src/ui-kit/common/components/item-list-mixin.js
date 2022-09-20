import _ from 'lodash';

export default {
  props: {
    schema: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    slotNames() {
      const $root = this.supNodes[0];
      let slotNames = Object.keys($root.$slots || {});
      slotNames = slotNames.concat(Object.keys($root.$scopedSlots || {}));
      return _.uniq(slotNames);
    },
    subformMarginY() {
      return (this.schema.formConf && this.schema.formConf.marginY) || 15;
    },
    editable() {
      return !this.readonly && !this.disabled;
    },
    reversal() {
      if (this.firstItemAdd || this.layout === 'reversal') {
        return true;
      }
      return false;
    },
    layout() {
      // default reversal firstItemAdd
      return this.field.layout || 'default';
    },
    firstItemAdd() {
      return this.field.layout === 'firstItemAdd';
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
    subformField() {
      return {
        ...this.field,
        effect: undefined,
      };
    },
    subformSchema() {
      return {
        ...this.field,
        type: 'subform',
      };
    },
    items: {
      get() {
        return this.data[this.field.name];
      },
      set(items) {
        this.$set(this.data, this.field.name, items);
      }
    }
  },
  created() {
    if(!this.items) {
      this.items = [];
    }
  },
  methods: {
    addItem() {
      let items = [...this.items, {}];
      if (this.reversal) {
        items = [{}, ...this.items];
      }
      this.items = items;
    },
    deleteItem(item) {
      this.$confirm('确认删除?', null, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      }).then(() => {
        this.items = this.items.filter(i => i !== item);

        this.$message({
          type: 'success',
          message: '已删除',
        });
      }).catch(() => {});
    },
    async validate() {
      return new Promise(async resolve => {
        let subformItems = this.$refs['subformItem'] || [];
        if(!_.isArray(subformItems)) { // length === 1
          subformItems = [subformItems];
        }

        const valids = await Promise.all(subformItems.map(subform => {
          return subform.validate();
        }));
        let valiResult = true;
        valids.forEach(valid => {
          valiResult = valiResult && valid;
        })
        return resolve(valiResult);
      });
    }
  }
}
