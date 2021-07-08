<template>
  <div class="subform-wrap">
    <el-tag
      size="mini"
      class="form-tag"
    >
      列表 {{ field.name }}
    </el-tag>
    <ItemList
      :form-key="field.name"
      :data="data"
      :v-status="vStatus"
      :field="schema"
      :schema="schema"
      :sup-nodes="supNodes"
      :class="statusClasses"
    />
    <el-tag
      size="mini"
      class="form-tag"
    >
      列表项表单
    </el-tag>
    <FormEditor
      ref="schemaEditor"
      :form-key="field.name"
      :init-schema="field"
      :data="schemaData"
    />
  </div>
</template>

<style scoped>
.subform-wrap {
  width: 100%;
}
.form-tag {
  margin-top: 10px;
  margin-bottom: 10px;
}
.form-tag:first-child {
  margin-top: 0;
}
</style>

<script>
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'

import isVue2 from 'vue';

// 全局引入，避免循环引用
// import FormEditor from '@/ui-kit/form-editor'

export default {
  type: 'item-list',
  name: 'IItemList',
  components: {
    // FormEditor,
    ItemList: isVue2 ? require('./item-list').default : require('./item-list3').default,
  },
  mixins: [editorItemMixin],
  data() {
    return {
      schemaData: {},
    };
  },
  computed: {
    schema() {
      return {
        ...this.field,
        ...this.$store.state[this.field.name],
      };
    }
  }
}
</script>
