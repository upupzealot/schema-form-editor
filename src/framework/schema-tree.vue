<template>
  <el-tree
    :data="tree"
    :props="treeConf"
    node-key="id"
    default-expand-all
    class="schema-tree"
    @node-click="onSelect"
  >
    <template #default="{ data }">
      <div
        :class="{ 'active-schema': data.id === schemaId }"
        style="height: 26px; width: 100%"
      >
        <i
          v-if="isVue2"
          :class="{
            'el-icon-folder': !data.isSchema,
            'el-icon-document': data.isSchema,
          }"
        />
        <el-icon
          v-else-if="!data.isSchema"
          :size="14"
        >
          <Folder />
        </el-icon>
        <el-icon
          v-else-if="data.isSchema"
          :size="14"
        >
          <Document />
        </el-icon>
        {{ data.label }}
      </div>
    </template>
  </el-tree>
</template>

<style scoped>
.active-schema {
  background: #f0f9ff;
}
</style>

<script>
import md5 from 'md5';
import getService from '../service'
import isVue2 from '@/ui-kit/common/util-is-vue2';

export default {
  props: {
    tree: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isVue2,
      schemaId: getService('schema').currentId(),
      treeConf: {
        label: 'label',
        children: 'data',
      }
    }
  },
  watch: {
    schemaId: {
      async handler(val) {
        if(val) {
          const schemaSrv = getService('schema');
          const { status, data } = await schemaSrv.get(val);
          if(status && data && data.schema) {
            schemaSrv.select(val);
            const { schema } = data;
            let count = 0;
            function addId(form) {
              if(form.fieldList) {
                form.fieldList.forEach(field => {
                  field.id = md5(`${Date.now()}${count}`).substr(0, 7);
                  count++;
                  addId(field);
                })
              }
            }
            addId(schema);

            this.$store.dispatch('reset');
            this.$store.commit('$root/setFormConf', schema.formConf || {});
            this.$store.commit('$root/setFieldList', schema.fieldList || []);
            this.$store.commit('$root/setValidFuncs', schema.validFuncs || []);
            this.$store.commit('$root/setValidRules', schema.validRules || {});
          }
        }
      },
      immediate: true,
    }
  },
  methods: {
    onSelect(node) {
      const { id } = node;
      if(id.endsWith('.schema.json')) {
        this.schemaId = id;
      }
    }
  },
}
</script>