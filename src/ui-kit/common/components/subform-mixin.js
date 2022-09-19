import _ from 'lodash';

export default {
  props: {
    inline: {
      type: Boolean,
      default: false
    },
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
  },
  methods: {
    async validate() {
      return new Promise(async resolve => {
        if(this.$refs['formRender']) { // incase not activated
          const valid = await this.$refs['formRender'].validate();
          resolve(valid);
        } else {
          resolve(true);
        }
      })
    }
  }
}
