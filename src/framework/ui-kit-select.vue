<template>
  <el-submenu
    index="ui-kit"
    style="float: right;"
  >
    <template v-slot:title>
      <el-image
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
        :src="uiKitItem.icon"
        style="width: 30px; height: 30px; margin-right: 10px;"
      />
      {{ uiKitItem.name }}
    </el-menu-item>
  </el-submenu>
</template>

<script>
import _ from 'lodash';

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
