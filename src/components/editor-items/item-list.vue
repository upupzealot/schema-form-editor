<template>
  <div
    v-if="enabled"
    class="subform-wrap"
  >
    <el-tag
      size="mini"
      class="form-tag"
    >
      列表 {{ field.name }}
    </el-tag>
    <ItemList
      :form-key="field.name"
      :data="data"
      :field="schema"
      :sup-nodes="supNodes"
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
      :data="{}"
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
import standardMixin from '../form-items/standard-mixin'

// 全局引入，避免循环引用
import ItemList from '../form-items/item-list'
// import FormEditor from '@/components/form-editor'

export default {
  name: 'IItemList',
  components: {
    // FormEditor,
    ItemList,
  },
  mixins: [standardMixin],
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
