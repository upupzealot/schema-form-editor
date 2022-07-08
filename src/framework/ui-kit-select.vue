<template>
  <component
    :is="isVue2 ? 'el-submenu' : 'el-sub-menu'"
    index="ui-kit"
    style="position: absolute; right: 0;"
  >
    <template v-slot:title>
      <el-image
        class="ui-kit-img"
        :src="uiKit.icon"
        style="width: 30px; height: 30px; margin-right: 10px;"
      />
      {{ uiKit.name }}
    </template>
    <el-menu-item
      v-for="uiKitItem in uiKitList"
      :key="uiKitItem.key"
      :index="uiKitItem.key"
      @click="onSelectUiKit(uiKitItem.key)"
    >
      <el-image
        class="ui-kit-img"
        :src="uiKitItem.icon"
        style="width: 30px; height: 30px; margin-right: 10px;"
      />
      {{ uiKitItem.name }}
    </el-menu-item>
  </component>
</template>

<script>
import _ from 'lodash';
import isVue2 from '@/ui-kit/common/util-is-vue2';

export default {
  data() {
    const uiKitList = [{
      key: 'element-ui',
      name: 'Element UI',
      icon: '/element-ui.ico',
    }, {
      key: 'ant-design',
      name: 'Ant Design Vue',
      icon: '/ant-design-vue.png',
    }];

    return {
      isVue2,
      uiKey: localStorage.getItem('ui-kit'),
      uiKitList,
      uiKitMap: _.keyBy(uiKitList, 'key'),
    }
  },
  computed: {
    uiKit() {
      return this.uiKitMap[this.uiKey];
    }
  },
  methods: {
    onSelectUiKit(uiKey) {
      localStorage.setItem('ui-kit', uiKey);
      window.location.reload();
    }
  },
}
</script>

<style>
.ui-kit-img img {
  vertical-align: top;
}
</style>