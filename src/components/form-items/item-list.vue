<template>
  <el-form-item
    v-if="enabled"
    :label="field.label"
    class="subform-wrap form-item"
  >
    <div
      v-for="(item, i) in items"
      :key="i"
      class="list-item"
    >
      <FormRender
        :schema="schema"
        :data="item"
      />
    </div>
    <el-button
      style="display: block;"
      @click.stop="addItem"
    >
      新增列表项
    </el-button>
  </el-form-item>
</template>

<style>
.subform-wrap .list-item .form-item {
  margin-bottom: 15px;
}
</style>

<style scoped>
.subform-wrap {
  width: 100%;
}
.subform-wrap .list-item {
  margin: 10px 0;
  border: 1px dashed #eee;
  padding: 15px 15px 0;
}
</style>

<script>
import standardMixin from './standard-mixin'

// import FormRender from '@/components/form-render'

export default {
  name: 'ItemList',
  components: {
    // FormRender
  },
  mixins: [standardMixin],
  computed: {
    schema() {
      return this.$store.state[this.field.name];
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
      this.items = [...this.items, {}];
    }
  }
}
</script>
