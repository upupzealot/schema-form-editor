import isVue2 from 'vue';
import commonMixin from '@/ui-kit/common/form-item/mixin'
import Tooltip from '@/ui-kit/ant-design/components/tooltip.vue'

export default {
  ...commonMixin,
  components: {
    Tooltip,
  },
  computed: {
    ...commonMixin.computed,
    formItemIs() {
      return isVue2 ? 'a-form-model-item' : 'a-form-item';
    },
  }
}
