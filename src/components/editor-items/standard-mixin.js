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
        enabled: true,
        vEnabled: true,
      },
    }
  },
  watch: {
    'vStatus.enabled': {
      handler(enabled) {
        if(enabled === isTriggerSelf) { // 用 1 来标识是不是 watcher 自身触发的赋值
          return;
        }

        this.$set(this.vStatus, 'vEnabled', enabled);
        this.$set(this.vStatus, 'enabled', isTriggerSelf);
      }
    }
  }
}