const isTriggerSelf = Symbol(true);

export default {
  props: {
    supNodes: {
      type: Array,
      default() {
        return null;
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    field: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      vStatus: {
        activated: true,
        vActivated: true,
      },
    }
  },
  watch: {
    'vStatus.activated': {
      handler(activated) {
        if(activated === isTriggerSelf) { // 用 Symbol(true) 来标识是不是 watcher 自身触发的赋值
          return;
        }

        this.$set(this.vStatus, 'vActivated', activated);
        this.$set(this.vStatus, 'activated', isTriggerSelf);
      }
    }
  }
}